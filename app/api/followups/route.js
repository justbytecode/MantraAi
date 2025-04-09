import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { predictFollowUpTiming } from "@/lib/gemini";

export async function GET(req) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const followups = await prisma.outreach.findMany({
    where: { campaign: { userId: session.user.id }, status: "sent" },
  });

  const updatedFollowups = await Promise.all(
    followups.map(async (item) => {
      const timing = await predictFollowUpTiming(item);
      if (new Date() > new Date(timing)) {
        return await prisma.outreach.create({
          data: {
            leadId: item.leadId,
            campaignId: item.campaignId,
            channel: item.channel,
            message: `Follow-up: ${item.message}`,
            status: "sent",
            sentAt: new Date(),
          },
        });
      }
      return item;
    })
  );

  return new Response(JSON.stringify({ followups: updatedFollowups }), { status: 200 });
}