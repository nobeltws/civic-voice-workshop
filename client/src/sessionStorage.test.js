import { describe, expect, it } from "vitest";
import { clearStoredSession, loadStoredSession, saveStoredSession } from "./sessionStorage";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value),
  };
}

describe("session storage", () => {
  it("restores a saved session", () => {
    const session = { token: "demo-token", user: { name: "Asha Tan", role: "citizen" } };
    const storage = createStorage();

    saveStoredSession(session, storage);

    expect(loadStoredSession(storage)).toEqual(session);
  });

  it("clears the saved session on sign out", () => {
    const storage = createStorage({
      civicVoiceSession: JSON.stringify({ token: "demo-token" }),
    });

    clearStoredSession(storage);

    expect(loadStoredSession(storage)).toBeNull();
  });

  it("drops unreadable saved session data", () => {
    const storage = createStorage({ civicVoiceSession: "not json" });

    expect(loadStoredSession(storage)).toBeNull();
    expect(storage.getItem("civicVoiceSession")).toBeNull();
  });
});
