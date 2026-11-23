import { APIError, APIConnectionError, APIUserAbortError } from "@anthropic-ai/sdk";

/**
 * What went wrong with the API, said in Czech.
 *
 * Without this the preacher sees the raw body — „[Odpověď se nepodařilo
 * dokončit: 401 {"type":"error","error":{...}}]" — which says nothing about
 * what to do. The SDK gives `type` from the response body (an `ErrorType`),
 * so the distinctions that matter here (bad key vs. no credit vs. busy) can
 * be told apart.
 */
export function describeAiError(e: unknown): { message: string; status: number } {
  if (e instanceof APIUserAbortError) {
    return { message: "Odpověď byla přerušená.", status: 499 };
  }
  if (e instanceof APIConnectionError) {
    return {
      message: "Nepodařilo se spojit s AI. Zkontroluj připojení a zkus to znovu.",
      status: 503,
    };
  }
  if (e instanceof APIError) {
    switch (e.type) {
      case "authentication_error":
      case "permission_error":
        return {
          message:
            "AI není dostupná — klíč k API je neplatný nebo nemá oprávnění. Je potřeba vyměnit ANTHROPIC_API_KEY.",
          status: 503,
        };
      case "billing_error":
        return {
          message: "AI není dostupná — na účtu u API došel kredit.",
          status: 503,
        };
      case "rate_limit_error":
        return {
          message: "AI je právě vytížená. Zkus to prosím za chvíli znovu.",
          status: 429,
        };
      case "overloaded_error":
      case "timeout_error":
      case "api_error":
        return {
          message: "AI je teď přetížená nebo nedostupná. Zkus to prosím za chvíli znovu.",
          status: 503,
        };
      // invalid_request_error and not_found_error mean the app sent something
      // wrong — keep a short detail, it is the only clue when debugging.
      default: {
        const detail =
          typeof e.message === "string" ? e.message.slice(0, 120) : "neznámá chyba";
        return { message: `Požadavek na AI se nezdařil: ${detail}`, status: 502 };
      }
    }
  }
  return { message: "Odpověď se nepodařilo získat.", status: 502 };
}
