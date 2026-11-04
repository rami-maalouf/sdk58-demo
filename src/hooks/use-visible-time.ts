import { useEffect, useState } from 'react';

/**
 * how long the screen has been visible, as `m:ss`. with `activityEnabled` on the tabs, react
 * activity stops the interval while another tab is open and keeps the count, so the timer pauses
 * and goes on from the same value when you come back.
 */
export function useVisibleTime() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
