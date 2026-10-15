import { useEffect } from 'react';

const useReminderScheduler = () => {
  const scheduleReminder = (taskName, reminderTime) => {
    const delay = reminderTime.getTime() - new Date().getTime();
    if (delay > 0) {
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.Notification) {
          new Notification(taskName, {
            body: 'Your reminder for: ' + taskName,
          });
        }
      }, delay);
    }
  };

  return { scheduleReminder };
};

export default useReminderScheduler;
