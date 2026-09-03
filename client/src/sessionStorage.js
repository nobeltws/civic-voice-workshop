const SESSION_STORAGE_KEY = "civicVoiceSession";

function getLocalStorage() {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function loadStoredSession(storage = getLocalStorage()) {
  if (!storage) return null;

  try {
    const value = storage.getItem(SESSION_STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    storage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }
}

export function saveStoredSession(session, storage = getLocalStorage()) {
  if (!storage) return;

  storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredSession(storage = getLocalStorage()) {
  if (!storage) return;

  storage.removeItem(SESSION_STORAGE_KEY);
}
