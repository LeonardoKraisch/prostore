import "server-only";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";

/** Garante que existe um usuário logado. Lança erro caso contrário. */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("User is not authenticated");
  return session;
}

/**
 * Garante que o usuário logado é admin.
 * O papel é conferido no banco a cada chamada, e não só no token JWT:
 * assim um admin rebaixado ou desativado perde o acesso na hora,
 * mesmo que ainda tenha um token válido.
 */
export async function requireAdmin() {
  const session = await requireAuth();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true, password: true },
  });
  if (!user || user.role !== "admin" || !user.password) {
    throw new Error("User is not authorized");
  }
  return session;
}
