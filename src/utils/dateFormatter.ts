function sameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function getDateStr(date: Date): string {
  const cmp = new Date();
  if (sameDay(cmp, date)) {
    return "Today";
  }
  cmp.setDate(cmp.getDate() - 1);
  if (sameDay(cmp, date)) {
    return "Yesterday";
  }
  cmp.setDate(cmp.getDate() - 6);
  if (date > cmp && date < new Date()) {
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
    });
  }
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}
