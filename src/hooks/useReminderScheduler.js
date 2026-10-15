import { useEffect } from 'react';

export default function useReminderScheduler(reminders) {
  useEffect(() => {
    const timers = [];
    reminders.forEach(({ id, time, title }) => {
      const delay = new Date(time).getTime() - Date.now();
      if (delay > 0) {
        const timer = setTimeout(() => {
          if ('Notification' in window) {
            new Notification(title || 'Reminder', {
              body: `Task reminder: ${title}`,
              tag: id,
            });
          }
        }, delay);
        timers.push(timer);
      }
    });
    return () => timers.forEach(clearTimeout);
  }, [reminders]);
}
