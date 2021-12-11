export const formatAmount = (amount) => {
  if (typeof amount !== "number") return;
  const value = Number(amount);
  let formattedAmount = "0";

  if (!isNaN(value)) {
    formattedAmount = String(amount).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return `${"\u20A6"} ${formattedAmount}`;
};
