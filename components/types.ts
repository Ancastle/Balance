export type Tab = { key: string; title: string };

export type TransactionType = "expence" | "entry";

export interface Category {
  id: string;
  name: string;
  type: string;
}

export interface TransactionInput {
  name: string;
  type: TransactionType;
  value: string;
  categoryId: string;
}

export interface TransactionDay {
  day: number;
  month: number;
}

export interface TransactionHour {
  hour: number;
  minutes: number;
}

export interface Transaction {
  id: string | number[];
  name: string;
  type: TransactionType;
  categoryId: string;
  value: string;
  day: TransactionDay;
  hour: TransactionHour;
}

export interface TransactionsListData {
  title: string;
  data: Transaction[];
}
