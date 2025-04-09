import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import axios from "axios";

export async function GET(req) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const crmData = await prisma.lead.findMany({
    where: { userId: session.user.id },
    select: { id: true, name: true, email: true },
  });

  // Sync with Zapier
  await axios.post(process.env.ZAPIER_WEBHOOK_URL, { leads: crmData });

  return new Response(JSON.stringify({ crmData }), { status: 200 });
}