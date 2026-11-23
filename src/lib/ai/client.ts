import Anthropic from "@anthropic-ai/sdk";
import { describeAiError } from "./errors";

export const AI_MODEL = "claude-opus-5";

let client: Anthropic | null = null;

/** Server-side only. Reads ANTHROPIC_API_KEY; null when it isn't configured. */
export function getAiClient(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  if (!client) client = new Anthropic();
  return client;
}

/**
 * Turn a streaming message into a plain-text Response the browser can read
 * progressively.
 *
 * The first event is awaited before the Response is built: an invalid key or
 * an overloaded API fails right there, and then the caller gets a real error
 * status with a Czech sentence instead of a 200 whose body happens to contain
 * the API's raw JSON. Once text is flowing a late failure can only be
 * appended — the status is long since sent — so it is appended in Czech.
 */
export async function textStreamResponse(
  stream: AsyncIterable<Anthropic.MessageStreamEvent>,
): Promise<Response> {
  const iterator = stream[Symbol.asyncIterator]();

  let first: IteratorResult<Anthropic.MessageStreamEvent>;
  try {
    first = await iterator.next();
  } catch (e) {
    const { message, status } = describeAiError(e);
    return Response.json({ error: message }, { status });
  }

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: Anthropic.MessageStreamEvent) => {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      };
      try {
        let step = first;
        while (!step.done) {
          emit(step.value);
          step = await iterator.next();
        }
      } catch (e) {
        controller.enqueue(encoder.encode(`\n\n[${describeAiError(e).message}]`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export const notConfigured = () =>
  Response.json({ error: "AI není nastavená — chybí ANTHROPIC_API_KEY." }, { status: 503 });
