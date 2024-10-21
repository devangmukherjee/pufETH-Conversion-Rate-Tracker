export const formatData = (num: number): string => {
  if (Math.abs(num) >= 1.0e15) {
    return (num / 1.0e15).toFixed(2) + "Q"; // Quadrillion
  } else if (Math.abs(num) >= 1.0e12) {
    return (num / 1.0e12).toFixed(2) + "T"; // Trillion
  } else if (Math.abs(num) >= 1.0e9) {
    return (num / 1.0e9).toFixed(2) + "B"; // Billion
  } else if (Math.abs(num) >= 1.0e6) {
    return (num / 1.0e6).toFixed(2) + "M"; // Million
  } else if (Math.abs(num) >= 1.0e3) {
    return (num / 1.0e3).toFixed(2) + "K"; // Thousand
  } else {
    return num.toFixed(2);
  }
};
