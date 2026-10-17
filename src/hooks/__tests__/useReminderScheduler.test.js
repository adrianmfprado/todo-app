import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import useReminderScheduler from '../useReminderScheduler';

describe('useReminderScheduler', () => {
  let notificationMock;

  beforeEach(() => {
    vi.useFakeTimers();
    notificationMock = vi.fn();
    window.Notification = notificationMock;
  });

  afterEach(() => {
    delete window.Notification;
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('agenda uma notificacao no horario especificado', () => {
    const { scheduleReminder } = useReminderScheduler();

    const future = new Date(Date.now() + 60000);

    scheduleReminder('Test Task', future);

    expect(notificationMock).not.toHaveBeenCalled();

    vi.advanceTimersByTime(61000);

    expect(notificationMock).toHaveBeenCalledTimes(1);
    expect(notificationMock).toHaveBeenCalledWith('Test Task', expect.any(Object));
  });

  test('nao agenda notificacao quando o horario ja passou', () => {
    const { scheduleReminder } = useReminderScheduler();

    const past = new Date(Date.now() - 60000);

    scheduleReminder('Test Task', past);

    vi.advanceTimersByTime(120000);

    expect(notificationMock).not.toHaveBeenCalled();
  });
});