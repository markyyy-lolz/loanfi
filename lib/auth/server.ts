import { createNeonAuth } from "@neon/auth/next/server";
if (!process.env.NEON_AUTH_BASE_URL) throw new Error("Missing NEON_AUTH_BASE_URL");
if (!process.env.NEON_AUTH_COOKIE_SECRET) throw new Error("Missing NEON_AUTH_COOKIE_SECRET");
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL,
  cookies: { secret: process.env.NEON_AUTH_COOKIE_SECRET },
});
