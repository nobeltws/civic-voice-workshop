import { describe, expect, it } from "vitest";
import { getLoginCredentials } from "./loginCredentials";

describe("login credential validation", () => {
  it("returns an inline error before credentials are sent", () => {
    const result = getLoginCredentials({ nric: "bad-id", password: "citizen123", role: "citizen" });

    expect(result).toEqual({
      error: "Enter a workshop ID like S0000001A.",
      credentials: null,
    });
  });

  it("accepts and normalizes a seeded fictional workshop ID", () => {
    const result = getLoginCredentials({ nric: " s0000001a ", password: "citizen123", role: "citizen" });

    expect(result).toEqual({
      error: "",
      credentials: { nric: "S0000001A", password: "citizen123", role: "citizen" },
    });
  });
});
