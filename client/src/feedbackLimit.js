export const FEEDBACK_CHARACTER_LIMIT = 500;

export function limitFeedbackMessage(message) {
  return message.slice(0, FEEDBACK_CHARACTER_LIMIT);
}
