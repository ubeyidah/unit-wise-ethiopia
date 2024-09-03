export const formatNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (num / 1000).toFixed(num % 1000 !== 0 ? 1 : 0) + "k";
  } else if (num < 1000000000) {
    return (num / 1000000).toFixed(num % 1000000 !== 0 ? 1 : 0) + "M";
  } else {
    return (num / 1000000000).toFixed(num % 1000000000 !== 0 ? 1 : 0) + "B";
  }
};
