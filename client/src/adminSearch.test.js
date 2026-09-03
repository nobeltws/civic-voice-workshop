import { describe, expect, it } from "vitest";
import { filterFeedbackByKeyword } from "./adminSearch";

const feedback = [
  { id: "one", name: "Aisha Rahman", message: "Sheltered walkway lights turn off early." },
  { id: "two", name: "Mei Lin", message: "More benches near the market would help." },
];

describe("admin feedback search", () => {
  it("matches citizen names case-insensitively", () => {
    expect(filterFeedbackByKeyword(feedback, "rahman")).toEqual([feedback[0]]);
  });

  it("matches feedback messages case-insensitively", () => {
    expect(filterFeedbackByKeyword(feedback, "BENCHES")).toEqual([feedback[1]]);
  });

  it("returns all loaded feedback when the keyword is blank", () => {
    expect(filterFeedbackByKeyword(feedback, "   ")).toEqual(feedback);
  });
});
