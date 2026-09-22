import { getAiClient, AI_MODEL, textStreamResponse, notConfigured } from "@/lib/ai/client";
import { REVISE_SYSTEM, LIMITS } from "@/lib/ai/prompts";

export const runtime = "nodejs";
// The whole sermon comes back again — far more output than the other calls.
export const maxDuration = 300;

interface ReviseRequest {
  sunday: string;
  readings: { label: string; reference: string }[];
  sermonText: string;
  /** The preacher's own preparation, already labelled ("Jádro kázání: …"). */
  preparation: string[];
}

/**
 * The sermon handed back whole, with every addition marked [[…]] and every
 * proposed cut marked {{…}}. Per-point proposals can't see the whole, which
 * is how a citation gets repeated and an ending stays unfinished; this can.
 */
export async function POST(req: Request) {
  const client = getAiClient();
  if (!client) return notConfigured();

  let body: ReviseRequest;
  try {
    body = (await req.json()) as ReviseRequest;
  } catch {
    return Response.json({ error: "Neplatný požadavek." }, { status: 400 });
  }
  const sermon = String(body.sermonText ?? "").trim();
  if (sermon.split(/\s+/).length < 80) {
    return Response.json(
      { error: "Na projití celého kázání je textu ještě málo." },
      { status: 400 },
    );
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
    max_tokens: LIMITS.reviseMaxTokens,
    system: REVISE_SYSTEM,
    output_config: { effort: "low" },
    messages: [
      {
        role: "user",
        content: `Neděle: ${body.sunday ?? ""}\nČtení: ${readings}\n\nPříprava faráře:\n${prep || "- (nic)"}\n\nKázání k projití:\n${sermonText}`,
      },
    ],
  });
  return textStreamResponse(stream);
}
