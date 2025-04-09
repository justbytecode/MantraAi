import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Adjust model as needed

export async function analyzeLeads(leads) {
  const prompt = `Analyze the following leads and return a comma-separated list of scores (0-100) based on their potential:\n${JSON.stringify(leads)}\nExample output: "85, 90, 75"`;
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const scores = text.split(",").map((score) => parseFloat(score.trim()) || 0);
    return scores.length === leads.length ? scores : leads.map(() => 0); // Fallback if mismatch
  } catch (error) {
    console.error("Gemini API error in analyzeLeads:", error);
    return leads.map(() => 0); // Fallback on error
  }
}

export async function generateOutreachContent(lead) {
  const prompt = `Generate a personalized ${lead.channel} message for ${lead.name} at ${lead.company}.`;
  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini API error in generateOutreachContent:", error);
    return `Hello ${lead.name}, let's connect about ${lead.company}!`; // Fallback
  }
}

export async function predictFollowUpTiming(outreach) {
  const prompt = `Predict the optimal follow-up time (ISO format) for this outreach: ${JSON.stringify(outreach)}. Return only the ISO string (e.g., "2025-04-10T12:00:00Z").`;
  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini API error in predictFollowUpTiming:", error);
    return new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // Fallback: 24h later
  }
}

export async function generateSalesScript(lead) {
  const prompt = `Generate a sales script for ${lead.name} at ${lead.company}.`;
  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini API error in generateSalesScript:", error);
    return `Hi ${lead.name}, I'm reaching out about ${lead.company}...`; // Fallback
  }
}

export async function generateInsights(leads, campaigns) {
  const prompt = `Analyze these leads and campaigns to provide actionable insights:\nLeads: ${JSON.stringify(leads)}\nCampaigns: ${JSON.stringify(campaigns)}\nReturn a concise summary.`;
  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini API error in generateInsights:", error);
    return "Unable to generate insights at this time."; // Fallback
  }
}