import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CitizenPage, SubmissionSuccessBanner } from "./CitizenPage";

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
    expect(markup).toContain('<button class="primary-button" type="submit">Submit feedback</button>');
  });

  it("shows the short submission reference in the success message", () => {
    const markup = renderToStaticMarkup(<SubmissionSuccessBanner reference="CV-123456" />);

    expect(markup).toContain("Thank you. Your feedback has been received.");
    expect(markup).toContain("Reference:");
    expect(markup).toContain("CV-123456");
    expect(markup).not.toContain("00000000-0000-0000-0000-000000000000");
  });
});
