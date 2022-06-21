/// Types
import { Transaction } from "./types";
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
) => {
  const MONTHS = LANGUAGES.months;
  const lastXMonths = [];
  for (let index = actualMonth; lastXMonths.length < numberOfMonths; index--) {
    if (index >= 0) {
      lastXMonths.push(MONTHS[language][index]);
    } else {
      lastXMonths.push(MONTHS[language][12 + index]);
    }
  }
  return lastXMonths.reverse();
};
