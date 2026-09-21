import Anthropic from "@anthropic-ai/sdk";

export const AI_MODEL = "claude-opus-5";

let client: Anthropic | null = null;

/** Server-side only. Reads ANTHROPIC_API_KEY; null when it isn't configured. */
export function getAiClient(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  if (!client) client = new Anthropic();
  return client;
}

/** Turn a streaming message into a plain-text Response the browser can read progressively. */
export function textStreamResponse(stream: AsyncIterable<Anthropic.MessageStreamEvent>): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (e) {
        controller.enqueue(encoder.encode(`\n\n[Odpověď se nepodařilo dokončit: ${e instanceof Error ? e.message : "chyba"}]`));
      } finally {
        controller.close();
      }
    },
  });
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}

export const notConfigured = () =>
  Response.json({ error: "AI není nastavená — chybí ANTHROPIC_API_KEY." }, { status: 503 });
