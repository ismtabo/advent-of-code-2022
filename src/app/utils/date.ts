const today = new Date();
export function isToday(dirtyDate: Date | number) {
  const date = new Date(dirtyDate);
  return date.toDateString() === today.toDateString();
}
