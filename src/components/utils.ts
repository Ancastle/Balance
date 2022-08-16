/// Types
import { Transaction } from "./types";

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
