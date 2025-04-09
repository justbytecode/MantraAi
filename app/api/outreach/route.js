import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { generateOutreachContent } from "@/lib/gemini";

export async function GET(req) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const outreach = await prisma.outreach.findMany({
    where: { campaign: { userId: session.user.id } },
  });

  const updatedOutreach = await Promise.all(
    outreach.map(async (item) => {
      if (item.status === "pending") {
        const message = await generateOutreachContent(item.lead);
        return await prisma.outreach.update({
          where: { id: item.id },
          data: { message, status: "sent", sentAt: new Date() },
        });
      }
      return item;
    })
  );

  return new Response(JSON.stringify({ outreach: updatedOutreach }), { status: 200 });
}