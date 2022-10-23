export const formatAmount = (amount) => {
  const value = Number(amount);
  if (isNaN(value)) return;
  let formattedAmount = "0";

  if (!isNaN(value)) {
    formattedAmount = String(amount).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return `${"\u20A6"} ${formattedAmount}`;
};

export const formatDateJoined = (dateString) => {
  const date = dateString ? new Date(dateString) : new Date();

  const monthJoined = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(date);
  const yearJoined = date.getFullYear();

  return `${monthJoined}, ${yearJoined}`;
};

export const truncateString = (str, num) => {
  if (str.length <= num) return str;

  let newStr = str.substring(0, num);
  let lastSpace = newStr.lastIndexOf(" ");
  let result = newStr.substring(0, lastSpace);

  return result + "...";
};

export const getEditPostData = (data = {}) => {
  return { 
    title: data.title,
    price: data.price,
    description: data.description,
    location: data.location,
  };
};