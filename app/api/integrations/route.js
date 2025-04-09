import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const integrations = await prisma.integration.findMany({
    where: { userId: session.user.id },
  });
  return new Response(JSON.stringify(integrations), { status: 200 });
}

export async function POST(req) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { type, config } = await req.json();
  const integration = await prisma.integration.create({
    data: {
      userId: session.user.id,
      type,
      config,
    },
  });
  return new Response(JSON.stringify(integration), { status: 201 });
}