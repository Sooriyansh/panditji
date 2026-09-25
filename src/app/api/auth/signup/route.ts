import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { normalizeEmail, usersCollection } from "@/lib/users";

export const runtime = "nodejs";

const signupWindows = new Map<string, { count: number; resetAt: number }>();

function limited(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const current = signupWindows.get(ip); const now = Date.now();
  if (!current || current.resetAt < now) { signupWindows.set(ip, { count: 1, resetAt: now + 15 * 60_000 }); return false; }
  current.count += 1; return current.count > 5;
}

export async function POST(request: Request) {
  if (limited(request)) return NextResponse.json({ message: "बहुत अधिक प्रयास हुए हैं। कृपया थोड़ी देर बाद प्रयास करें।" }, { status: 429 });
  let data: Record<string, unknown>;
  try { data = await request.json() as Record<string, unknown>; } catch { return NextResponse.json({ message: "कृपया सही जानकारी भेजें।" }, { status: 400 }); }
  const name = typeof data.name === "string" ? data.name.trim().replace(/\s+/g, " ").slice(0, 100) : "";
  const email = typeof data.email === "string" ? normalizeEmail(data.email) : "";
  const password = typeof data.password === "string" ? data.password : "";
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ message: "कृपया नाम और सही ईमेल पता दर्ज करें।" }, { status: 400 });
  if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) return NextResponse.json({ message: "पासवर्ड कम-से-कम 8 अक्षर का हो और उसमें अक्षर व अंक हों।" }, { status: 400 });
  try {
    const users = await usersCollection(); const now = new Date();
    await users.insertOne({ name, email, passwordHash: await bcrypt.hash(password, 12), role: "user", provider: "credentials", createdAt: now, updatedAt: now });
    return NextResponse.json({ success: true, message: "आपका अकाउंट बन गया है।" }, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000) return NextResponse.json({ message: "इस ईमेल से पहले से अकाउंट मौजूद है। कृपया लॉगिन करें।" }, { status: 409 });
    console.error("Signup failed", error);
    return NextResponse.json({ message: "अकाउंट अभी नहीं बन सका। कृपया फिर प्रयास करें।" }, { status: 503 });
  }
}
