import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CitizenPage } from "./CitizenPage";

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
});
