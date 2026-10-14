import {
  RECURRENCE,
  isValidRecurrence,
  getNextOccurrence,
  createNextInstance,
} from "../recurrence";

describe("isValidRecurrence", () => {
  it("accepts daily, weekly, monthly", () => {
    expect(isValidRecurrence(RECURRENCE.DAILY)).toBe(true);
    expect(isValidRecurrence(RECURRENCE.WEEKLY)).toBe(true);
    expect(isValidRecurrence(RECURRENCE.MONTHLY)).toBe(true);
  });

  it("rejects none and invalid values", () => {
    expect(isValidRecurrence(RECURRENCE.NONE)).toBe(false);
    expect(isValidRecurrence("yearly")).toBe(false);
    expect(isValidRecurrence(undefined)).toBe(false);
    expect(isValidRecurrence(null)).toBe(false);
  });
});

describe("getNextOccurrence", () => {
  const base = new Date("2026-10-12T10:00:00Z");

  it("adds 1 day for daily", () => {
    const next = getNextOccurrence(base, RECURRENCE.DAILY);
    expect(next.getDate()).toBe(13);
  });

  it("adds 7 days for weekly", () => {
    const next = getNextOccurrence(base, RECURRENCE.WEEKLY);
    expect(next.getDate()).toBe(19);
  });

  it("adds 1 month for monthly", () => {
    const next = getNextOccurrence(base, RECURRENCE.MONTHLY);
    expect(next.getMonth()).toBe(10); // November (0-indexed)
    expect(next.getDate()).toBe(12);
  });

  it("clamps Jan 31 monthly to Feb 28 (month overflow)", () => {
    const jan31 = new Date("2026-01-31T10:00:00Z");
    const next = getNextOccurrence(jan31, RECURRENCE.MONTHLY);
    expect(next.getMonth()).toBe(1); // February
    expect(next.getDate()).toBe(28); // 2026 not a leap year
  });

  it("does not mutate the input date", () => {
    const d = new Date("2026-10-12T10:00:00Z");
    getNextOccurrence(d, RECURRENCE.DAILY);
    expect(d.getDate()).toBe(12);
  });

  it("throws on invalid frequency", () => {
    expect(() => getNextOccurrence(base, "yearly")).toThrow();
    expect(() => getNextOccurrence(base, RECURRENCE.NONE)).toThrow();
  });

  it("throws on invalid base date", () => {
    expect(() => getNextOccurrence("not-a-date", RECURRENCE.DAILY)).toThrow();
  });
});

describe("createNextInstance", () => {
  const task = {
    title: "Water plants",
    category: "Personal",
    checked: true,
    recurrence: RECURRENCE.DAILY,
  };

  it("creates a new unchecked instance with next dueDate", () => {
    const completedAt = new Date("2026-10-12T10:00:00Z");
    const next = createNextInstance(task, completedAt);
    expect(next).not.toBeNull();
    expect(next.title).toBe("Water plants");
    expect(next.category).toBe("Personal");
    expect(next.checked).toBe(false);
    expect(next.recurrence).toBe(RECURRENCE.DAILY);
    expect(new Date(next.dueDate).getDate()).toBe(13);
  });

  it("returns null for non-recurring tasks", () => {
    expect(createNextInstance({ ...task, recurrence: RECURRENCE.NONE }, new Date())).toBeNull();
    expect(createNextInstance({ ...task, recurrence: undefined }, new Date())).toBeNull();
    expect(createNextInstance(null, new Date())).toBeNull();
  });

  it("uses current time when completedAt is omitted", () => {
    const next = createNextInstance(task);
    expect(next).not.toBeNull();
    expect(new Date(next.dueDate).getTime()).toBeGreaterThan(Date.now());
  });
});
