export type Tab = { key: string; title: string };

export type TransactionType = "expence" | "entry";

export interface Language {
  name: string;
  id: number;
}

export type UuId = string | number[];

export interface Preferences {
  appLanguage: number;
}

export interface CategoryType {
  id: UuId;
  name: string;
  type: string;
}

export interface Person {
  id: UuId;
  name: string;
  value: string;
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
  year: number;
}

export interface TransactionHour {
  hour: number;
  minutes: number;
}

export interface Transaction {
  id: UuId;
  name: string;
  type: TransactionType;
  categoryId: string;
  value: string;
  day: TransactionDay;
  hour: TransactionHour;
}
