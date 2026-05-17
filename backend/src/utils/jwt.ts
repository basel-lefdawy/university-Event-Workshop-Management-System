import jwt, { type SignOptions } from "jsonwebtoken";
import type { Role } from "@prisma/client";
import { env } from "../config/env.js";

export interface TokenPayload {
  sub: number;
  email: string;
  role: Role;
}

export function signToken(payload: TokenPayload): string {
  const options: SignOptions = { expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"] };
  return jwt.sign(payload, env.jwtSecret, options);
}

export function verifyToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, env.jwtSecret);
  if (typeof decoded === "string") {
    throw new Error("Invalid token payload");
  }
  return decoded as unknown as TokenPayload;
}
