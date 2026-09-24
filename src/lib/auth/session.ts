import { createHmac, timingSafeEqual, scryptSync, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "avero_portal_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

export type PortalUser = {
  id: string;
  email: string;
  name: string;
  role: "employee" | "manager" | "admin";
  title: string;
  department: string;
};

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  role: PortalUser["role"];
  title: string;
  department: string;
  exp: number;
};

type StoredUser = PortalUser & { passwordHash: string; salt: string };

function sessionSecret(): string {
  const secret = process.env.PORTAL_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("PORTAL_SESSION_SECRET must be set (min 16 characters)");
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", sessionSecret()).update(value).digest("base64url");
}

export function encodeSession(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${body}.${sign(body)}`;
}

export function decodeSession(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  let expected: string;
  try {
    expected = sign(body);
  } catch {
    return null;
  }
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now() / 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const s = salt ?? randomBytes(16).toString("hex");
  const hash = scryptSync(password, s, 32).toString("hex");
  return { hash, salt: s };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const next = scryptSync(password, salt, 32).toString("hex");
  try {
    return timingSafeEqual(Buffer.from(next, "hex"), Buffer.from(hash, "hex"));
  } catch {
    return false;
  }
}

/**
 * Real employee accounts only — configured via environment.
 * No demo / placeholder users are created.
 *
 * Required:
 *   PORTAL_ADMIN_EMAIL, PORTAL_ADMIN_PASSWORD, PORTAL_SESSION_SECRET
 *
 * Optional extra staff (JSON array):
 *   PORTAL_USERS=[{"email":"...","password":"...","name":"...","role":"employee","title":"...","department":"..."}]
 */
export function getPortalUsers(): StoredUser[] {
  const users: StoredUser[] = [];

  const adminEmail = process.env.PORTAL_ADMIN_EMAIL?.trim();
  const adminPassword = process.env.PORTAL_ADMIN_PASSWORD?.trim();
  if (adminEmail && adminPassword && adminPassword.length >= 8) {
    const { hash, salt } = hashPassword(adminPassword, "avero-admin-v1");
    users.push({
      id: "admin-001",
      email: adminEmail,
      name: process.env.PORTAL_ADMIN_NAME?.trim() || "Abdul Rehman",
      role: "admin",
      title: process.env.PORTAL_ADMIN_TITLE?.trim() || "Chief Technology Lead",
      department: process.env.PORTAL_ADMIN_DEPARTMENT?.trim() || "Corporate",
      passwordHash: hash,
      salt,
    });
  }

  const raw = process.env.PORTAL_USERS?.trim();
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Array<{
        email: string;
        password: string;
        name: string;
        role?: PortalUser["role"];
        title?: string;
        department?: string;
      }>;
      parsed.forEach((entry, index) => {
        if (!entry.email || !entry.password || entry.password.length < 8 || !entry.name) return;
        const { hash, salt } = hashPassword(entry.password, `avero-user-v1-${index}`);
        users.push({
          id: `staff-${index + 1}`,
          email: entry.email.trim(),
          name: entry.name.trim(),
          role: entry.role ?? "employee",
          title: entry.title?.trim() || "Team member",
          department: entry.department?.trim() || "Company",
          passwordHash: hash,
          salt,
        });
      });
    } catch (error) {
      console.error("[portal] PORTAL_USERS JSON is invalid", error);
    }
  }

  return users;
}

export function authenticate(email: string, password: string): PortalUser | null {
  const normalized = email.trim().toLowerCase();
  const user = getPortalUsers().find((u) => u.email.toLowerCase() === normalized);
  if (!user) return null;
  if (!verifyPassword(password, user.passwordHash, user.salt)) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    title: user.title,
    department: user.department,
  };
}

export function createSessionToken(user: PortalUser): string {
  const payload: SessionPayload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    title: user.title,
    department: user.department,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  return encodeSession(payload);
}

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  return decodeSession(jar.get(SESSION_COOKIE)?.value);
}

export function sessionCookieOptions(token: string) {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
