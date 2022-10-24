import DateDiff from "date-diff";

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

export const splitDateAndTime = (date) => {
  date = new Date(date);
  const padTo2Digits = num => String(num).padStart(2, "0");

  const time = `${
    padTo2Digits(date.getHours())
  }:${
    padTo2Digits(date.getMinutes())
  }${(Number(date.getHours()) < 12) ? "am" : "pm"}`;

  return {
    time,
    date: date.toISOString().split("T")[0].replace(/-/gi, "/"),
  };
};

export const formatChatTime = (chatTime) => {
  const { time, date } = splitDateAndTime(chatTime);

  const diff = new DateDiff(new Date(), new Date(chatTime));

  if (diff.days() < 1) {
    return String(time);
  } 

  if (diff.days() < 2) {
    return "Yesterday";
  }

  return String(date);
};