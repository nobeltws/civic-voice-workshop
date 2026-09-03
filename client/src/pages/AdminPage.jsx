import { useEffect, useMemo, useState } from "react";
import { filterFeedbackByKeyword } from "../adminSearch";
import { getFeedback } from "../api";
import { getInboxSummaryCounts } from "../inboxSummary";

export function AdminPage({ user }) {
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState("");
  const summaryCounts = getInboxSummaryCounts(feedback);
  const summaryCards = [
    { label: "Total", value: summaryCounts.total },
    { label: "New", value: summaryCounts.new },
    { label: "In review", value: summaryCounts.inReview },
    { label: "Closed", value: summaryCounts.closed },
  ];
  const filteredFeedback = useMemo(() => filterFeedbackByKeyword(feedback, keyword), [feedback, keyword]);
  const hasKeyword = keyword.trim().length > 0;

  useEffect(() => {
    getFeedback(user).then((response) => setFeedback(response.feedback)).catch((requestError) => setError(requestError.message));
  }, [user]);

  return (
    <main className="page-shell admin-shell">
      <div className="page-heading">
        <div className="eyebrow">Admin workspace</div>
        <h1>Feedback inbox</h1>
        <p>A simple view of feedback received from members of the public.</p>
      </div>
      {error && <p className="error-message">{error}</p>}
      <section className="inbox-summary" aria-label="Inbox summary">
        {summaryCards.map((card) => (
          <article className="summary-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </section>
      <section className="feedback-list">
        <div className="list-header">
          <strong>Latest feedback</strong>
          <span>{hasKeyword ? `${filteredFeedback.length} of ${feedback.length}` : feedback.length} items</span>
        </div>
        <label className="search-field">Search feedback
          <input
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Search by name or message"
          />
        </label>
        {filteredFeedback.length === 0 && (
          <p className="empty-state">{hasKeyword ? "No feedback matches your search." : "No feedback has been received yet."}</p>
        )}
        {filteredFeedback.map((item) => (
          <article className="feedback-row" key={item.id}>
            <div>
              <div className="feedback-meta">{item.name} · {new Date(item.createdAt).toLocaleDateString()}</div>
              <p>{item.message}</p>
            </div>
            <span className="status-pill">{item.status}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
