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
  return `${makeDoubleDigit(date.getMonth() + 1)}/${makeDoubleDigit(
    date.getDay()
  )}`;
};

export const getDateHourMinutes = (date: Date) => {
  return `${makeDoubleDigit(date.getHours() + 1)}:${makeDoubleDigit(
    date.getMinutes()
  )}`;
};

// export const testingTrans: Transaction[] = [
//   {
//     id: "0",
//     name: "trans1",
//     type: "expence",
//     categoryId: "expence0",
//     value: "25000",
//     date: "2022-11-23T12:45:41-05:00",
//     isNecesary: true,
//   },
//   {
//     id: "1",
//     name: "trans1",
//     type: "entry",
//     categoryId: "entry0",
//     value: "50000",
//     date: "2022-11-23T12:45:41-05:00",
//     isNecesary: true,
//   },
//   {
//     id: "2",
//     name: "trans1",
//     type: "expence",
//     categoryId: "expence0",
//     value: "50000",
//     date: "2022-11-23T12:45:41-05:00",
//     isNecesary: true,
//   },
//   {
//     id: "3",
//     name: "trans1",
//     type: "entry",
//     categoryId: "entry0",
//     value: "50000",
//     date: "2022-11-22T12:45:41-05:00",
//     isNecesary: true,
//   },
//   {
//     id: "4",
//     name: "trans1",
//     type: "expence",
//     categoryId: "expence0",
//     value: "1448",
//     date: "2022-11-22T12:45:41-05:00",
//     isNecesary: false,
//   },
//   {
//     id: "5",
//     name: "trans1",
//     type: "expence",
//     categoryId: "expence0",
//     value: "15000",
//     date: "2022-11-21T12:45:41-05:00",
//     isNecesary: false,
//   },
//   {
//     id: "6",
//     name: "trans1",
//     type: "expence",
//     categoryId: "expence0",
//     value: "25000",
//     date: "2022-11-20T12:45:41-05:00",
//     isNecesary: false,
//   },
//   {
//     id: "7",
//     name: "trans1",
//     type: "expence",
//     categoryId: "expence0",
//     value: "15000",
//     date: "2022-11-23T12:45:41-05:00",
//     isNecesary: false,
//   },
//   {
//     id: "8",
//     name: "trans1",
//     type: "expence",
//     categoryId: "expence0",
//     value: "25000",
//     date: "2022-11-24T12:45:41-05:00",
//     isNecesary: false,
//   },
//   {
//     id: "9",
//     name: "trans1",
//     type: "expence",
//     categoryId: "expence0",
//     value: "25000",
//     date: "2022-11-19T12:45:41-05:00",
//     isNecesary: false,
//   },
//   {
//     id: "10",
//     name: "trans1",
//     type: "expence",
//     categoryId: "expence0",
//     value: "25000",
//     date: "2022-11-18T12:45:41-05:00",
//     isNecesary: true,
//   },
//   {
//     id: "11",
//     name: "trans1",
//     type: "entry",
//     categoryId: "entry0",
//     value: "25000",
//     date: "2022-11-18T12:45:41-05:00",
//     isNecesary: true,
//   },
//   {
//     id: "12",
//     name: "trans1",
//     type: "expence",
//     categoryId: "expence0",
//     value: "250000",
//     date: "2022-11-16T12:45:41-05:00",
//     isNecesary: true,
//   },
//   {
//     id: "13",
//     name: "trans1",
//     type: "entry",
//     categoryId: "entry0",
//     value: "250000",
//     date: "2022-11-15T12:45:41-05:00",
//     isNecesary: true,
//   },
//   {
//     id: "14",
//     name: "trans1",
//     type: "expence",
//     categoryId: "expence0",
//     value: "1500000",
//     date: "2022-11-10T12:45:41-05:00",
//     isNecesary: true,
//   },
//   {
//     id: "0",
//     name: "trans1",
//     type: "entry",
//     categoryId: "entry0",
//     value: "9000000",
//     date: "2022-11-10T12:45:41-05:00",
//     isNecesary: true,
//   },
// ];
