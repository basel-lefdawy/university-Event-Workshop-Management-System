import { Role } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { env } from "../config/env.js";
import { conflict, unauthorized } from "../utils/errors.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";
import { mapUser } from "../utils/mappers.js";

export async function ensureDefaultAdmin() {
  const existing = await prisma.user.findUnique({
    where: { email: env.adminEmail.toLowerCase() },
  });
  if (existing) return;

  const passwordHash = await hashPassword(env.adminPassword);
  await prisma.user.create({
    data: {
      name: env.adminName,
      email: env.adminEmail.toLowerCase(),
      passwordHash,
      role: Role.ADMIN,
    },
  });
  console.log(`Default admin created: ${env.adminEmail}`);
}

export async function registerStudent(name: string, email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    throw conflict("Email is already registered");
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role: Role.STUDENT,
    },
  });

  const token = signToken({ sub: user.id, email: user.email, role: user.role });
  return { user: mapUser(user), token };
}

export async function login(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) {
    throw unauthorized("Invalid email or password");
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    throw unauthorized("Invalid email or password");
  }

  const token = signToken({ sub: user.id, email: user.email, role: user.role });
  return { user: mapUser(user), token };
}

export async function getProfile(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw unauthorized("User not found");
  }
  return mapUser(user);
}
