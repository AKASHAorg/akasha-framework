import { useState } from 'react';

export const enum CloseNotificationFlags {
  CLOSE_THE_MERGE_NOTIFICATION_FLAG = 'close-the-merge-notification',
  CLOSE_PRIVATE_ALPHA_NOTIFICATION_FLAG = 'close-private-alpha-notification',
}

const getInitialCloseState = (key: CloseNotificationFlags, initialValue: boolean) => {
  if (window?.localStorage) {
    try {
      const closedFlag = window.localStorage.getItem(key);
      if (closedFlag) {
        return JSON.parse(closedFlag);
      } else {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch (err) {
      // console.log(err);
      return initialValue;
    }
  }
};

export function useCloseNotification(key: CloseNotificationFlags, initialValue = false) {
  const [closed, setClosed] = useState<boolean>(() => getInitialCloseState(key, initialValue));

  const setValue = (newClosedValue: boolean) => {
    try {
      setClosed(newClosedValue);
      if (window?.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(newClosedValue));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return [closed, setValue];
}
