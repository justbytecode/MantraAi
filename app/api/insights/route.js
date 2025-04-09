import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const totalLeads = await prisma.lead.count({ where: { userId: session.user.id } });
  const activeCampaigns = await prisma.campaign.count({
    where: { userId: session.user.id, status: "active" },
  });
  const predictedRevenue = totalLeads * 1000; // Simplified AI prediction

  return new Response(
    JSON.stringify({ totalLeads, activeCampaigns, predictedRevenue }),
    { status: 200 }
  );
}