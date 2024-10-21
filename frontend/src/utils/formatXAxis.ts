export const formatXAxis = (tickItem: Date) => {
  return tickItem.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
