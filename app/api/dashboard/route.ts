import { requireUser } from "@/lib/auth/require-user";
import { sql } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const access = await requireUser();
    if ("response" in access) return access.response;
    const [borrowerCount, activeLoans, outstanding, paymentTotals, recentBorrowers] = await Promise.all([
      sql`SELECT COUNT(*)::int AS count FROM public.borrowers`,
      sql`SELECT COUNT(*)::int AS count FROM public.loans WHERE status = 'active'`,
      sql`SELECT COALESCE(SUM(outstanding_balance), 0)::numeric AS amount FROM public.loans WHERE status = 'active'`,
      sql`SELECT COALESCE(SUM(amount), 0)::numeric AS amount FROM public.payments WHERE paid_at >= date_trunc('month', CURRENT_DATE)`,
      sql`SELECT id, borrower_number, first_name, last_name, phone, status, created_at FROM public.borrowers ORDER BY created_at DESC LIMIT 6`,
    ]);
    return Response.json({
      profile: access.profile,
      stats: {
        borrowers: Number(borrowerCount[0]?.count ?? 0),
        activeLoans: Number(activeLoans[0]?.count ?? 0),
        outstanding: Number(outstanding[0]?.amount ?? 0),
        paymentsThisMonth: Number(paymentTotals[0]?.amount ?? 0),
      },
      recentBorrowers,
    });
  } catch (error) {
    console.error("Dashboard query failed", error);
    return Response.json({ error: "Unable to load dashboard data. Check database configuration and schema." }, { status: 500 });
  }
}
