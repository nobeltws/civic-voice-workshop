const STATUS_KEYS = {
  closed: "closed",
  inreview: "inReview",
  new: "new",
};

function normalizeStatus(status) {
  return String(status ?? "").toLowerCase().replace(/[^a-z]/g, "");
}

export function getInboxSummaryCounts(feedback) {
  return feedback.reduce(
    (counts, item) => {
      const statusKey = STATUS_KEYS[normalizeStatus(item.status)];
      counts.total += 1;
      if (statusKey) counts[statusKey] += 1;
      return counts;
    },
    { total: 0, new: 0, inReview: 0, closed: 0 },
  );
}
