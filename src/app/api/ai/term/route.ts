import type Anthropic from "@anthropic-ai/sdk";
import { getAiClient, AI_MODEL, textStreamResponse, notConfigured } from "@/lib/ai/client";
import { TERM_SYSTEM, TERM_FOLLOWUP_SYSTEM, LIMITS } from "@/lib/ai/prompts";

export const runtime = "nodejs";

interface TermRequest {
  term: string;
  reference: string;
  text: string;
  /** Follow-up: the first answer and the new question. */
  previousAnswer?: string;
  followup?: string;
}

/**
 * „Co to znamená?" — a quick question while reading, answered in the context
 * of the pericope on screen. Streams plain text.
 */
export async function POST(req: Request) {
  const client = getAiClient();
  if (!client) return notConfigured();

  let body: TermRequest;
  try {
    body = (await req.json()) as TermRequest;
  } catch {
    return Response.json({ error: "Neplatný požadavek." }, { status: 400 });
  }
  const term = (body.term ?? "").trim().slice(0, 200);
  const reference = (body.reference ?? "").trim().slice(0, 80);
  const text = (body.text ?? "").trim().slice(0, LIMITS.termContextChars);
  if (!term || !text) return Response.json({ error: "Chybí pojem nebo text." }, { status: 400 });

  const isFollowup = Boolean(body.followup && body.previousAnswer);
  const messages: Anthropic.MessageParam[] = isFollowup
    ? [
        { role: "user", content: `Perikopa: ${reference}\n\n${text}\n\nOtázka: Co znamená „${term}"?` },
        { role: "assistant", content: (body.previousAnswer ?? "").slice(0, 4000) },
        { role: "user", content: (body.followup ?? "").trim().slice(0, 500) },
      ]
    : [{ role: "user", content: `Perikopa: ${reference}\n\n${text}\n\nOtázka: Co znamená „${term}"?` }];

  const stream = client.messages.stream({
    model: AI_MODEL,
    max_tokens: isFollowup ? LIMITS.followupMaxTokens : LIMITS.termMaxTokens,
    system: isFollowup ? TERM_FOLLOWUP_SYSTEM : TERM_SYSTEM,
    output_config: { effort: "medium" },
    messages,
  });
  return textStreamResponse(stream);
}
