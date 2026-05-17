import { Role } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { forbidden, notFound } from "../utils/errors.js";
import { mapRole } from "../utils/mappers.js";

export async function listUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { registrations: true } },
    },
  });

  return users.map((user) => ({
    id: String(user.id),
    name: user.name,
    email: user.email,
    role: mapRole(user.role),
    registrationCount: user._count.registrations,
    createdAt: user.createdAt.toISOString(),
  }));
}

export async function deleteUser(userId: number, actorId: number) {
  if (userId === actorId) {
    throw forbidden("You cannot delete your own account");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw notFound("User not found");
  }

  if (user.role === Role.ADMIN) {
    throw forbidden("Admin accounts cannot be deleted");
  }

  await prisma.user.delete({ where: { id: userId } });
}
