import { getAiClient, AI_MODEL, textStreamResponse, notConfigured } from "@/lib/ai/client";
import { FEEDBACK_SYSTEM, LIMITS } from "@/lib/ai/prompts";

export const runtime = "nodejs";

interface FeedbackRequest {
  sunday: string;
  readings: { label: string; reference: string }[];
  sermonText: string;
  /** The preacher's own preparation, already labelled ("Jádro kázání: …"). */
  preparation: string[];
}

/**
 * The sermon text read by a colleague: what works, what still needs work.
 * Points at places in the text, never rewrites them. Streams two sections.
 */
export async function POST(req: Request) {
  const client = getAiClient();
  if (!client) return notConfigured();

  let body: FeedbackRequest;
  try {
    body = (await req.json()) as FeedbackRequest;
  } catch {
    return Response.json({ error: "Neplatný požadavek." }, { status: 400 });
  }
  const sermon = String(body.sermonText ?? "").trim();
  if (sermon.split(/\s+/).length < 40) {
    return Response.json({ error: "Na zpětnou vazbu je textu ještě málo." }, { status: 400 });
  }
  const sermonText = sermon.slice(0, LIMITS.feedbackTextChars);

  const readings = (body.readings ?? []).map((r) => `${r.label}: ${r.reference}`).join(" · ");
  let prep = (Array.isArray(body.preparation) ? body.preparation : [])
    .map((p) => String(p).trim())
    .filter(Boolean)
    .map((p) => `- ${p}`)
    .join("\n");
  if (prep.length > LIMITS.feedbackContextChars) prep = prep.slice(0, LIMITS.feedbackContextChars) + "\n- …";

  const stream = client.messages.stream({
    model: AI_MODEL,
    max_tokens: LIMITS.feedbackMaxTokens,
    system: FEEDBACK_SYSTEM,
    output_config: { effort: "medium" },
    messages: [
      {
        role: "user",
        content: `Neděle: ${body.sunday ?? ""}\nČtení: ${readings}\n\nPříprava faráře:\n${prep || "- (nic)"}\n\nText kázání:\n${sermonText}`,
      },
    ],
  });
  return textStreamResponse(stream);
}
