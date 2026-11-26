import { auth } from "@/lib/auth/server";
import { sql } from "@/lib/db";
export async function requireUser() {
  const { data: session } = await auth.getSession();
  if (!session?.user) return { response: Response.json({ error: "Unauthorized" }, { status: 401 }) } as const;
  const rows = await sql`
    SELECT user_id, full_name, email, role, is_active
    FROM public.profiles WHERE user_id = ${session.user.id} LIMIT 1
  `;
  const profile = rows[0] as { user_id: string; full_name: string; email: string; role: "admin" | "staff"; is_active: boolean } | undefined;
  if (!profile || !profile.is_active) return { response: Response.json({ error: "Account is inactive or not provisioned." }, { status: 403 }) } as const;
  return { user: session.user, profile } as const;
}
