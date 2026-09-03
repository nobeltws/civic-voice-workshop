import { useState } from "react";
import { submitFeedback } from "../api";
import { FEEDBACK_CHARACTER_LIMIT, limitFeedbackMessage } from "../feedbackLimit";

export function CitizenPage({ user }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const characterCount = message.length;

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
            <div className="success-banner">Thank you. Your feedback has been received.</div>
            <p className="muted">You can send another note from this same signed-in session.</p>
            <button className="primary-button" type="button" onClick={handleSubmitAnother}>
              Submit another response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Your feedback
              <textarea
                rows="7"
                value={message}
                maxLength={FEEDBACK_CHARACTER_LIMIT}
                onChange={(event) => setMessage(limitFeedbackMessage(event.target.value))}
                placeholder="Share your feedback here..."
              />
            </label>
            <div className="character-count">{characterCount}/{FEEDBACK_CHARACTER_LIMIT} characters</div>
            <div className="form-footer">
              <span className="muted">Please do not include sensitive personal information.</span>
              <button className="primary-button">Submit feedback</button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
        )}
      </section>
    </main>
  );
}
