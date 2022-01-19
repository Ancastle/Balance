export type Tab = { key: string; title: string };

export type TransactionType = "expence" | "entry";

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

export type TransactionHour = {
  hour: number;
  minutes: number;
};

export interface Transaction {
  id: string | number[];
  name: string;
  type: TransactionType;
  categoryId: string;
  value: string;
  day: TransactionDay;
  hour: TransactionHour;
}
