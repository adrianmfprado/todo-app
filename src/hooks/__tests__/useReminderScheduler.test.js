import { renderHook, act } from '@testing-library/react-hooks';
import { useReminderScheduler } from '../useReminderScheduler';

describe('useReminderScheduler', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(Notification, 'requestPermission').mockResolvedValue('granted');
    jest.spyOn(Notification, 'new').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  test('schedules a notification at the specified time', async () => {
    const now = new Date();
    const future = new Date(now.getTime() + 1000 * 60);
    const { result } = renderHook(() => useReminderScheduler());

    act(() => {
      result.current.scheduleReminder('Test Task', future);
    });

    act(() => {
      jest.advanceTimersByTime(1000 * 60 + 1000);
    });

    expect(Notification).toHaveBeenCalledWith('Test Task', expect.any(Object));
  });
});
