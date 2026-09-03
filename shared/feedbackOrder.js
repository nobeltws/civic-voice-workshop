function createdAtTime(feedback) {
  const timestamp = Date.parse(feedback.createdAt);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function sortFeedbackNewestFirst(feedback) {
  return [...feedback].sort((left, right) => createdAtTime(right) - createdAtTime(left));
}
