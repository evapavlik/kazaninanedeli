import { getAiClient, AI_MODEL, textStreamResponse, notConfigured } from "@/lib/ai/client";
import { PROPOSE_SYSTEM, LIMITS } from "@/lib/ai/prompts";

export const runtime = "nodejs";

interface ProposeRequest {
  sunday: string;
  readings: { label: string; reference: string }[];
  sermonText: string;
  /** The preacher's own preparation, already labelled ("Jádro kázání: …"). */
  preparation: string[];
  /** The feedback point being developed, and the quoted place it belongs to. */
  point: string;
  where?: string;
}

/**
 * One or two paragraphs that develop a feedback point — from the preacher's
 * own material, in the voice of the surrounding text. A shape to rewrite,
 * inserted only when she clicks. Streams plain prose.
 */
export async function POST(req: Request) {
  const client = getAiClient();
  if (!client) return notConfigured();

  let body: ProposeRequest;
  try {
    body = (await req.json()) as ProposeRequest;
  } catch {
    return Response.json({ error: "Neplatný požadavek." }, { status: 400 });
  }
  const point = String(body.point ?? "").trim().slice(0, 1200);
  const sermonText = String(body.sermonText ?? "").trim().slice(0, LIMITS.feedbackTextChars);
  if (!point || !sermonText) {
    return Response.json({ error: "Chybí bod nebo text kázání." }, { status: 400 });
  }
  const where = String(body.where ?? "").trim().slice(0, 300);

  const readings = (body.readings ?? []).map((r) => `${r.label}: ${r.reference}`).join(" · ");
  let prep = (Array.isArray(body.preparation) ? body.preparation : [])
    .map((p) => String(p).trim())
    .filter(Boolean)
    .map((p) => `- ${p}`)
    .join("\n");
  if (prep.length > LIMITS.feedbackContextChars) prep = prep.slice(0, LIMITS.feedbackContextChars) + "\n- …";

  const stream = client.messages.stream({
    model: AI_MODEL,
    max_tokens: LIMITS.proposeMaxTokens,
    system: PROPOSE_SYSTEM,
    output_config: { effort: "medium" },
    messages: [
      {
        role: "user",
        content: `Neděle: ${body.sunday ?? ""}\nČtení: ${readings}\n\nPříprava faráře:\n${prep || "- (nic)"}\n\nText kázání:\n${sermonText}\n\nZpětná vazba k místu, které chce farář rozvést:\n${point}${where ? `\n\nNávrh se vloží za odstavec s úryvkem: „${where}"` : ""}`,
      },
    ],
  });
  return textStreamResponse(stream);
}
