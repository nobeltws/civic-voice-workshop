import { describe, expect, it } from "vitest";
import { getWorkshopNricError, normalizeWorkshopNric } from "./nricValidation";

describe("workshop NRIC-like validation", () => {
  it("accepts seeded fictional workshop IDs", () => {
    expect(getWorkshopNricError("S0000001A")).toBe("");
    expect(getWorkshopNricError("S0000002B")).toBe("");
  });

  it("rejects empty and malformed workshop IDs", () => {
    expect(getWorkshopNricError("")).toBe("Enter your workshop ID.");
    expect(getWorkshopNricError("not-an-id")).toBe("Enter a workshop ID like S0000001A.");
    expect(getWorkshopNricError("S000001A")).toBe("Enter a workshop ID like S0000001A.");
  });

  it("normalizes case and whitespace before login", () => {
    expect(normalizeWorkshopNric(" s0000001a ")).toBe("S0000001A");
    expect(getWorkshopNricError(" s0000001a ")).toBe("");
  });
});
