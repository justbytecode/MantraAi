import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { generateSalesScript } from "@/lib/gemini";

export async function GET(req) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const leads = await prisma.lead.findMany({ where: { userId: session.user.id } });
  const scripts = await Promise.all(
    leads.map(async (lead) => ({
      id: lead.id,
      lead,
      content: await generateSalesScript(lead),
    }))
  );

  return new Response(JSON.stringify({ scripts }), { status: 200 });
}