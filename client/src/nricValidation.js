const WORKSHOP_NRIC_PATTERN = /^[STFGM]\d{7}[A-Z]$/;

export function normalizeWorkshopNric(value) {
  return value.trim().toUpperCase();
}

export function getWorkshopNricError(value) {
  const normalized = normalizeWorkshopNric(value);

  if (!normalized) return "Enter your workshop ID.";
  if (!WORKSHOP_NRIC_PATTERN.test(normalized)) return "Enter a workshop ID like S0000001A.";

  return "";
}
