import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import axios from "axios";

export async function GET(req) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const leads = await prisma.lead.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  const notifications = await Promise.all(
    leads.map(async (lead) => {
      const message = `Lead Updated: ${lead.name} - Score: ${lead.score}`;
      await axios.post(process.env.SLACK_WEBHOOK_URL, { text: message });
      return { id: lead.id, message, sentAt: new Date() };
    })
  );

  return new Response(JSON.stringify({ notifications }), { status: 200 });
}