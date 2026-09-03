import { describe, expect, it } from "vitest";
import { getInboxSummaryCounts } from "./inboxSummary";

describe("inbox summary counts", () => {
  it("counts loaded feedback by status", () => {
    const feedback = [
      { status: "New" },
      { status: "In Review" },
      { status: "Closed" },
      { status: "New" },
    ];

    expect(getInboxSummaryCounts(feedback)).toEqual({
      total: 4,
      new: 2,
      inReview: 1,
      closed: 1,
    });
  });

  it("includes unknown statuses in the total only", () => {
    const feedback = [{ status: "New" }, { status: "Escalated" }];

    expect(getInboxSummaryCounts(feedback)).toEqual({
      total: 2,
      new: 1,
      inReview: 0,
      closed: 0,
    });
  });
});
