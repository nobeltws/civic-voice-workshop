const MASK_CHARACTER = "•";

export function maskNricLikeIdentifier(identifier) {
  const normalized = String(identifier ?? "").trim().toUpperCase();
  if (!normalized) return "";
  if (normalized.length <= 3) return MASK_CHARACTER.repeat(normalized.length);

  const visiblePrefix = normalized.slice(0, 1);
  const visibleSuffix = normalized.slice(-2);
  const hiddenLength = normalized.length - visiblePrefix.length - visibleSuffix.length;

  return `${visiblePrefix}${MASK_CHARACTER.repeat(hiddenLength)}${visibleSuffix}`;
}
