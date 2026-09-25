import type { Collection, ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";

export type UserRole = "user" | "admin";
export type UserDocument = {
  _id?: ObjectId;
  name: string;
  email: string;
  passwordHash?: string;
  image?: string;
  role: UserRole;
  provider: "credentials" | "google";
  createdAt: Date;
  updatedAt: Date;
};

export async function usersCollection(): Promise<Collection<UserDocument>> {
  const users = (await getDatabase()).collection<UserDocument>("users");
  await users.createIndex({ email: 1 }, { unique: true });
  await users.createIndex({ role: 1 });
  return users;
}

export function normalizeEmail(value: string) { return value.trim().toLowerCase(); }
