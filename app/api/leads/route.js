import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { analyzeLeads } from "@/lib/gemini";

export async function GET(req) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  try {
    const leads = await prisma.lead.findMany({
      where: { userId: session.user.id },
    });

    // If no leads exist, return an empty array
    if (!leads || leads.length === 0) {
      return new Response(JSON.stringify({ leads: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const scores = await analyzeLeads(leads);
    const updatedLeads = await Promise.all(
      leads.map(async (lead, i) => {
        return await prisma.lead.update({
          where: { id: lead.id },
          data: { score: scores[i] || 0 }, // Fallback to 0 if score is undefined
        });
      })
    );

    return new Response(JSON.stringify({ leads: updatedLeads }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch leads", leads: [] }), // Always include leads key
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}