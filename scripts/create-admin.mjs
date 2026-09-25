import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

if (typeof process.loadEnvFile === "function") {
  try { process.loadEnvFile(".env.local"); } catch { try { process.loadEnvFile(".env"); } catch { /* Environment can also be supplied by the shell. */ } }
}

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const uri = process.env.MONGODB_URI;
if (!uri || !email || !password) {
  console.error("MONGODB_URI, ADMIN_EMAIL और ADMIN_PASSWORD environment variables आवश्यक हैं।");
  process.exit(1);
}
if (password.length < 12) {
  console.error("ADMIN_PASSWORD कम-से-कम 12 अक्षर का होना चाहिए।");
  process.exit(1);
}

const client = new MongoClient(uri);
try {
  await client.connect();
  const users = client.db(process.env.MONGODB_DB || "panditji").collection("users");
  await users.createIndex({ email: 1 }, { unique: true });
  const now = new Date();
  await users.updateOne(
    { email },
    { $set: { email, role: "admin", passwordHash: await bcrypt.hash(password, 12), provider: "credentials", updatedAt: now }, $setOnInsert: { name: "व्यवस्थापक", createdAt: now } },
    { upsert: true },
  );
  console.log(`Admin account is ready for ${email}.`);
} finally { await client.close(); }
