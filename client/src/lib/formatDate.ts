import en from "javascript-time-ago/locale/en";
import TimeAgo from "javascript-time-ago";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

export const formatDate = (date: Date): string => {
  return timeAgo.format(new Date(date));
};
