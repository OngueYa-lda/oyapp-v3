import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

export const dateFormat = (date, f = 'dd MMMM') => {
  // 'date' pode ser = null | moment obj | Date
  if (date) return format(new Date(date), f || 'dd MMMM', { locale: pt });
  return date;
};

export const today = () => new Date();

export const daysFromToday = (day = 1) => {
  const date = today();
  return new Date(date.setDate(date.getDate() + (day || 1)));
};

export const tomorrow = () => daysFromToday();

export const year = () => {
  const est = 2021;
  const current = today().getFullYear();
  if (est === current) return est;
  return `${est}-${current}`;
};

export const getDateDiff = (a, b) => {
  // day in milliseconds
  const dayInMs = 24 * 3600 * 1000;
  const normalize = x => Math.abs(Math.floor(x));
  const diff = normalize((a.getTime() - b.getTime()) / dayInMs);
  return diff - 1;
};
