export const formatDateFromIOS = (
  isoString: string,
  locale: string = "en-GB"
) => {
  if (!isoString) return "";

  const date = new Date(isoString);

  // Format options
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  };

  return new Intl.DateTimeFormat(locale, options).format(date);
};
