import "server-only";
import { auth } from "@/auth";

/** Garante que existe um usuário logado. Lança erro caso contrário. */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("User is not authenticated");
  return session;
}

/** Garante que o usuário logado é admin. Lança erro caso contrário. */
export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "admin") throw new Error("User is not authorized");
  return session;
}
