/// Types
import { Transaction } from "./types";

export const makeDoubleDigit = (number: number) => {
  if (number.toString().length === 1) {
    return `0${number}`;
  } else {
    return number.toString();
  }
};

export const makeFlatNumber = (num: string): number => {
  const match = num.match(/\d+/g);
  const response = match?.join("");
  return parseInt(response || "0");
};

export const makeCurrencyFormat = (num: number, skipDollar = false): string => {
  let answer = num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  if (!skipDollar) answer = "$ " + answer;
  return answer;
};

export const isEven = (number: number) => number % 2 === 0;

export const calculateTotal = (
  transactions: Transaction[],
  positiveType: string
) => {
  return transactions.reduce((total: number, transaction) => {
    if (transaction.type === positiveType) {
      return total + parseInt(transaction.value);
    } else {
      return total - parseInt(transaction.value);
    }
  }, 0);
};

export const calculateTypeTotal = (
  transactions: Transaction[],
  type: string
) => {
  return transactions.reduce((total: number, transaction) => {
    if (transaction.type === type) {
      return total + parseInt(transaction.value);
    } else {
      return total;
    }
  }, 0);
};

export const random_rgba = () => {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
};

export const getDateDayMonth = (date: Date) => {
  return `${date.getMonth() + 1}/${date.getDay()}`;
};

export const getDateHourMinutes = (date: Date) => {
  return `${date.getHours() + 1}:${date.getMinutes()}`;
};
