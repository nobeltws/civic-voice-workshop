export function filterFeedbackByKeyword(feedback, keyword) {
  const normalizedKeyword = keyword.trim().toLocaleLowerCase();
  if (!normalizedKeyword) return feedback;

  return feedback.filter((item) => {
    const name = item.name ?? "";
    const message = item.message ?? "";
    return `${name} ${message}`.toLocaleLowerCase().includes(normalizedKeyword);
  });
}
