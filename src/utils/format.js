export const formatAmount = (amount) => {
  const value = Number(amount);
  if(isNaN(value)) return
  let formattedAmount = "0";

  if (!isNaN(value)) {
    formattedAmount = String(amount).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return `${"\u20A6"} ${formattedAmount}`;
};

export const truncateString = (str, num) => {
  if (str.length <= num) return str

   let newStr = str.substring(0, num)
   let lastSpace = newStr.lastIndexOf(" ")
  let result = newStr.substring(0, lastSpace)

  return result + "..."
}