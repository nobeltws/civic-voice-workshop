import { getWorkshopNricError, normalizeWorkshopNric } from "./nricValidation";

export function getLoginCredentials({ nric, password, role }) {
  const error = getWorkshopNricError(nric);

  if (error) return { error, credentials: null };

  return {
    error: "",
    credentials: { nric: normalizeWorkshopNric(nric), password, role },
  };
}
