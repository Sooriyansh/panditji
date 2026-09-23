import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function currentUser() {
  const session = await getServerSession(authOptions);
  return session?.user?.id ? session.user : null;
}

export async function currentAdmin() {
  const user = await currentUser();
  return user?.role === "admin" ? user : null;
}
