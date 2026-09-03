import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CitizenPage, hasUsefulFeedback } from "./CitizenPage";

describe("CitizenPage accessibility", () => {
  it("wires the feedback form for labels, descriptions, and keyboard submission", () => {
    const markup = renderToStaticMarkup(
      <CitizenPage user={{ nric: "S0000001A", name: "Aisha Rahman" }} />,
    );

    expect(markup).toContain('<label for="feedback-message">Your feedback</label>');
    expect(markup).toContain('id="feedback-message"');
    expect(markup).toContain('aria-describedby="feedback-help feedback-count"');
    expect(markup).toContain('aria-invalid="false"');
    expect(markup).toContain('id="feedback-help"');
    expect(markup).toContain('id="feedback-count"');
    expect(markup).toContain('type="submit"');
    expect(markup).toContain("Submit feedback");
  });

  it("blocks submission until feedback contains non-whitespace text", () => {
    const blankMarkup = renderToStaticMarkup(
      <CitizenPage user={{ nric: "S0000001A", name: "Aisha Rahman" }} />,
    );

    expect(blankMarkup).toContain('<button class="primary-button" type="submit" disabled="">Submit feedback</button>');
    expect(hasUsefulFeedback(" \n\t ")).toBe(false);
    expect(hasUsefulFeedback("Please add more benches.")).toBe(true);
  });
});
