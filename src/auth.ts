import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { normalizeEmail, usersCollection, type UserDocument } from "@/lib/users";

const googleConfigured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function loginLimited(key: string) {
  const current = loginAttempts.get(key); const now = Date.now();
  return Boolean(current && current.resetAt > now && current.count >= 8);
}

function recordFailedLogin(key: string) {
  const current = loginAttempts.get(key); const now = Date.now();
  if (!current || current.resetAt <= now) loginAttempts.set(key, { count: 1, resetAt: now + 15 * 60_000 });
  else current.count += 1;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "ईमेल और पासवर्ड",
      credentials: { email: {}, password: {}, admin: {} },
      async authorize(credentials) {
        const values = (credentials ?? {}) as Record<string, unknown>;
        const email = typeof values.email === "string" ? normalizeEmail(values.email) : "";
        const password = typeof values.password === "string" ? values.password : "";
        if (!email || !password) return null;
        if (loginLimited(email)) return null;
        const user = await (await usersCollection()).findOne({ email });
        if (!user?.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) { recordFailedLogin(email); return null; }
        if (values.admin === "true" && user.role !== "admin") { recordFailedLogin(email); return null; }
        loginAttempts.delete(email);
        return { id: user._id.toString(), name: user.name, email: user.email, image: user.image, role: user.role };
      },
    }),
    ...(googleConfigured ? [Google({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET!, allowDangerousEmailAccountLinking: true })] : []),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user.email) return true;
      const users = await usersCollection();
      const email = normalizeEmail(user.email);
      const now = new Date();
      const existing = await users.findOneAndUpdate(
        { email },
        { $set: { name: user.name?.trim().slice(0, 100) || "उपयोगकर्ता", image: user.image || undefined, provider: "google", updatedAt: now }, $setOnInsert: { email, role: "user", createdAt: now } },
        { upsert: true, returnDocument: "after" },
      );
      const saved = existing as UserDocument | null;
      if (!saved || !saved._id) return false;
      user.id = saved._id.toString();
      user.role = saved.role;
      return true;
    },
    async jwt({ token, user }) {
      if (user) { token.id = user.id; token.role = user.role ?? "user"; }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) { session.user.id = token.id; session.user.role = token.role ?? "user"; }
      return session;
    },
  },
};
