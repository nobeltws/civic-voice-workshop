import { describe, expect, it } from "vitest";
import { FEEDBACK_CHARACTER_LIMIT, limitFeedbackMessage } from "./feedbackLimit";

describe("feedback character limit", () => {
  it("leaves messages at the limit unchanged", () => {
    const message = "a".repeat(FEEDBACK_CHARACTER_LIMIT);

    expect(limitFeedbackMessage(message)).toHaveLength(FEEDBACK_CHARACTER_LIMIT);
  });

  it("trims messages longer than the limit", () => {
    const message = "a".repeat(FEEDBACK_CHARACTER_LIMIT + 1);

    expect(limitFeedbackMessage(message)).toHaveLength(FEEDBACK_CHARACTER_LIMIT);
  });
});
