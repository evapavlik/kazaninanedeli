import { getAiClient, AI_MODEL, textStreamResponse, notConfigured } from "@/lib/ai/client";
import { MIRROR_SYSTEM, LIMITS } from "@/lib/ai/prompts";

export const runtime = "nodejs";

interface MirrorRequest {
  sunday: string;
  readings: { label: string; reference: string }[];
  /** The preacher's notes, already rendered as plain lines with their origin. */
  notes: string[];
}

/**
 * The notebook seen from above. Streams three short sections. Never proposes.
 */
export async function POST(req: Request) {
  const client = getAiClient();
  if (!client) return notConfigured();

  let body: MirrorRequest;
  try {
    body = (await req.json()) as MirrorRequest;
  } catch {
    return Response.json({ error: "Neplatný požadavek." }, { status: 400 });
  }
  const notes = (Array.isArray(body.notes) ? body.notes : []).map((n) => String(n).trim()).filter(Boolean);
  if (notes.length === 0) return Response.json({ error: "Zápisník je prázdný." }, { status: 400 });

  const readings = (body.readings ?? []).map((r) => `${r.label}: ${r.reference}`).join(" · ");
  let joined = notes.map((n) => `- ${n}`).join("\n");
  if (joined.length > LIMITS.mirrorNotesChars) joined = joined.slice(0, LIMITS.mirrorNotesChars) + "\n- …";

  const stream = client.messages.stream({
    model: AI_MODEL,
    max_tokens: LIMITS.mirrorMaxTokens,
    system: MIRROR_SYSTEM,
    output_config: { effort: "medium" },
    messages: [
      {
        role: "user",
        content: `Neděle: ${body.sunday ?? ""}\nČtení: ${readings}\n\nPoznámky faráře (${notes.length}):\n${joined}`,
      },
    ],
  });
  return textStreamResponse(stream);
}
