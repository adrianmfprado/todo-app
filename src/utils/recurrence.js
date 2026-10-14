// Recurrence logic for recurring tasks.
// Supported frequencies: 'daily', 'weekly', 'monthly'.

export const RECURRENCE = {
  NONE: 'none',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
};

export function isValidRecurrence(value) {
  return value === RECURRENCE.DAILY || value === RECURRENCE.WEEKLY || value === RECURRENCE.MONTHLY;
}

// Returns a Date for the next occurrence after `from` given a frequency.
// Throws on invalid frequency.
export function getNextOccurrence(from, frequency) {
  if (!isValidRecurrence(frequency)) {
    throw new Error('Invalid recurrence frequency: ' + frequency);
  }
  const base = from instanceof Date ? new Date(from.getTime()) : new Date(from);
  if (isNaN(base.getTime())) {
    throw new Error('Invalid base date');
  }
  switch (frequency) {
    case RECURRENCE.DAILY:
      base.setDate(base.getDate() + 1);
      break;
    case RECURRENCE.WEEKLY:
      base.setDate(base.getDate() + 7);
      break;
    case RECURRENCE.MONTHLY: {
      const day = base.getDate();
      base.setMonth(base.getMonth() + 1);
      // Handle month-length overflow (e.g. Jan 31 -> Mar 3). Clamp to last day of target month.
      if (base.getDate() < day) {
        base.setDate(0); // last day of previous month = last day of target month here
      }
      break;
    }
    default:
      break;
  }
  return base;
}

// Given a completed recurring task, returns a new task instance for the next
// occurrence, or null if the task is not recurring.
export function createNextInstance(task, completedAt) {
  if (!task || !isValidRecurrence(task.recurrence)) {
    return null;
  }
  const completedDate = completedAt instanceof Date ? completedAt : new Date(completedAt || Date.now());
  const nextDue = getNextOccurrence(completedDate, task.recurrence);
  return {
    title: task.title,
    category: task.category,
    checked: false,
    recurrence: task.recurrence,
    dueDate: nextDue.toISOString(),
  };
}
