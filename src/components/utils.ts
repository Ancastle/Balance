/// Types
import { monthIdentifier, Transaction } from "./types";
import { LANGUAGES } from "./statics";

export const makeDoubleDigit = (number: number) => {
  if (number.toString().length === 1) {
    return `0${number}`;
  } else {
    return number.toString();
  }
};

export const makeCurrencyFormat = (num: number): string => {
  return "$ " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
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

export const getLastMonths = (
  actualMonth: number,
  language: number,
  numberOfMonths: number
): monthIdentifier[] => {
  const MONTHS = LANGUAGES.months;
  const lastXMonths = [];
  const date = new Date();
  for (let index = actualMonth; lastXMonths.length < numberOfMonths; index--) {
    if (index >= 0) {
      lastXMonths.push({
        name: MONTHS[language][index],
        year: date.getFullYear(),
        index: index + 1,
      });
    } else {
      lastXMonths.push({
        name: MONTHS[language][12 + index],
        year: date.getFullYear() - 1,
        index: 13 + index,
      });
    }
  }
  return lastXMonths.reverse();
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
