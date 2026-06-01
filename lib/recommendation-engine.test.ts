import { describe, expect, it } from "vitest";

import { extractResponseText } from "./recommendation-engine";

describe("extractResponseText", () => {
  it("uses output_text when available", () => {
    expect(extractResponseText({ output_text: '{"summary":"ok"}' })).toBe('{"summary":"ok"}');
  });

  it("falls back to raw response output content text", () => {
    expect(
      extractResponseText({
        output: [
          {
            type: "message",
            content: [
              {
                type: "output_text",
                text: '{"summary":"from output array"}',
              },
            ],
          },
        ],
      }),
    ).toBe('{"summary":"from output array"}');
  });

  it("throws a helpful error on refusal", () => {
    expect(() =>
      extractResponseText({
        output: [
          {
            type: "message",
            content: [
              {
                type: "refusal",
                refusal: "I cannot comply with that request.",
              },
            ],
          },
        ],
      }),
    ).toThrow("OpenAI returned a refusal");
  });

  it("throws when neither convenience nor raw text is available", () => {
    expect(() => extractResponseText({ output: [] })).toThrow(
      "OpenAI response did not contain any readable text output.",
    );
  });
});
