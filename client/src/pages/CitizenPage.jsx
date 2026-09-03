import { useEffect, useRef, useState } from "react";
import { submitFeedback } from "../api";
import { FEEDBACK_CHARACTER_LIMIT, limitFeedbackMessage } from "../feedbackLimit";

export function CitizenPage({ user }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const successRef = useRef(null);
  const textareaRef = useRef(null);
  const characterCount = message.length;
  const feedbackDescription = [
    "feedback-help",
    "feedback-count",
    error ? "feedback-error" : "",
  ].filter(Boolean).join(" ");

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  useEffect(() => {
    if (error) textareaRef.current?.focus();
  }, [error]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await submitFeedback({ nric: user.nric, name: user.name, message });
      setSubmitted(true);
      setMessage("");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  function handleMessageChange(event) {
    setMessage(limitFeedbackMessage(event.target.value));
  }

  function handleSubmitAnother() {
    setSubmitted(false);
    setError("");
    setMessage("");
  }

  return (
    <main className="page-shell">
      <div className="page-heading">
        <div className="eyebrow">Public feedback</div>
        <h1>What would you like us to know?</h1>
        <p>Tell us about an issue, an idea, or a positive experience in your community.</p>
      </div>
      <section className="form-card">
        {submitted ? (
          <div className="confirmation-panel">
            <div className="success-banner" role="status" aria-live="polite" tabIndex="-1" ref={successRef}>
              Thank you. Your feedback has been received.
            </div>
            <p className="muted">You can send another note from this same signed-in session.</p>
            <button className="primary-button" type="button" onClick={handleSubmitAnother}>
              Submit another response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="feedback-message">Your feedback</label>
            <textarea
              id="feedback-message"
              ref={textareaRef}
              rows="7"
              value={message}
              maxLength={FEEDBACK_CHARACTER_LIMIT}
              onChange={handleMessageChange}
              placeholder="Share your feedback here..."
              aria-describedby={feedbackDescription}
              aria-invalid={error ? "true" : "false"}
            />
            <p className="muted form-help" id="feedback-help">Please do not include sensitive personal information.</p>
            <div className="character-count" id="feedback-count" aria-live="polite">{characterCount}/{FEEDBACK_CHARACTER_LIMIT} characters</div>
            <div className="form-footer">
              <button className="primary-button" type="submit">Submit feedback</button>
            </div>
            {error && <p className="error-message" id="feedback-error" role="alert">{error}</p>}
          </form>
        )}
      </section>
    </main>
  );
}
