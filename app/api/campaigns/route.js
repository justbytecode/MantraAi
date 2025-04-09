import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const campaigns = await prisma.campaign.findMany({
    where: { userId: session.user.id },
  });

  const updatedCampaigns = await Promise.all(
    campaigns.map(async (campaign) => {
      const outreachCount = await prisma.outreach.count({
        where: { campaignId: campaign.id, status: "sent" },
      });
      const successRate = outreachCount > 0 ? (outreachCount / 100) * 100 : 0; // Simplified
      return await prisma.campaign.update({
        where: { id: campaign.id },
        data: { metrics: { successRate } },
      });
    })
  );

  return new Response(JSON.stringify({ campaigns: updatedCampaigns }), { status: 200 });
}