import { describe, expect, it } from "vitest";
import { maskNricLikeIdentifier } from "./maskedIdentifier";

describe("masked identifiers", () => {
  it("keeps only the first character and last two characters visible", () => {
    expect(maskNricLikeIdentifier("S0000001A")).toBe("S••••••1A");
  });

  it("normalizes spacing and casing before display", () => {
    expect(maskNricLikeIdentifier(" s0000002b ")).toBe("S••••••2B");
  });
});
