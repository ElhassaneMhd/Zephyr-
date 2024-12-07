import { clsx } from 'clsx';
import { DateTime } from 'luxon';
import { twMerge } from 'tailwind-merge';

//*------ Dates And Time
export const getIsoDate = (date) => DateTime.fromISO(new Date(date).toISOString());

export const formatDate = (date, includeTime, format) => {
  if (!date) return null;
  return getIsoDate(date)
    .setLocale('fr')
    .toLocaleString(includeTime ? DateTime[format || 'DATETIME_SHORT'] : DateTime[format || 'DATE_FULL']);
};

export const getFirstOfCurrentMonthAtMidnight = () => {
  const firstOfMonth = DateTime.local().startOf('month');
  return firstOfMonth.toFormat("yyyy-MM-dd'T'HH:mm:ss");
};

//* ----- Other
export const cn = (...inputs) => twMerge(clsx(inputs));

export const objectDeepEquals = (a, b) => {
  if (!a && !b) return true;
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (a && b && Object.keys(a).length !== Object.keys(b).length) return false;

  for (const key in a) {
    if (!objectDeepEquals(a?.[key], b?.[key])) return false;
  }

  return true;
};

export const filterObject = (obj, keys, keysType) => {
  const filtered = {};
  for (const key in obj) {
    if (keysType === 'include' && keys.includes(key)) filtered[key] = obj[key];
    if (keysType === 'exclude' && !keys.includes(key)) filtered[key] = obj[key];
  }
  return filtered;
};

export const capitalize = (string) => string?.charAt(0).toUpperCase() + string?.slice(1);
