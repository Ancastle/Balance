import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Transaction, TransactionInput } from "../components/types";
import { RootState, AppThunk, store } from "./store";

import { STORAGE } from "../components/statics";
import { calculateTotal } from "../components/utils";

export interface TransactionsState {
  data: Transaction[];
  total: number;
  status: string;
}

const initialState: TransactionsState = {
  data: [],
  status: "idle",
  total: 0,
};

// Async
export const fetchTransactionsAsync = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE.transactions);
      if (value) {
        const parsed = JSON.parse(value).transactions;
        return parsed;
      }
    } catch (e) {
      console.log("Error: Could not fetch transactions data");
    }
  }
);

export const storeTransactionsAsync = createAsyncThunk(
  "transactions/storeTransactions",
  async (newTransactions: Transaction[]) => {
    try {
      const jsonValue = JSON.stringify({ transactions: newTransactions });
      await AsyncStorage.setItem(STORAGE.transactions, jsonValue);
    } catch (e) {
      console.log("Error: Could not store transactions data");
    }
    return newTransactions;
  }
);

// Slice
export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTransactionsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        fetchTransactionsAsync.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.status = "fulfilled";
          state.data = action.payload;
          state.total = calculateTotal(action.payload, "entry");
        }
      )
      .addCase(fetchTransactionsAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(storeTransactionsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        storeTransactionsAsync.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.status = "fulfilled";
          state.data = action.payload;
          state.total = calculateTotal(action.payload, "entry");
        }
      )
      .addCase(storeTransactionsAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// Thunks
export const addTransaction =
  (newTransaction: TransactionInput): AppThunk =>
  (dispatch, getState) => {
    const currentTransactions = selectTransactionsData(getState());
    const date = new Date();
    const transaction: Transaction = {
      ...newTransaction,
      id: uuid.v4(),
      day: {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      },
      hour: { hour: date.getHours(), minutes: date.getMinutes() },
    };
    const newTransactions = [transaction, ...currentTransactions];
    dispatch(storeTransactionsAsync(newTransactions));
  };

export const editTransaction =
  (editingTransaction: Transaction): AppThunk =>
  (dispatch, getState) => {
    const currentTransactions = selectTransactionsData(getState());
    const newTransactions = currentTransactions.map((t) => {
      if (t.id === editingTransaction.id) {
        return {
          ...t,
          name: editingTransaction.name,
          value: editingTransaction.value,
          categoryId: editingTransaction.categoryId,
        };
      } else {
        return t;
      }
    });
    dispatch(storeTransactionsAsync(newTransactions));
  };

export const addCreditCardPayment =
  (creditCardTransactions: Transaction[]): AppThunk =>
  (dispatch, getState) => {
    const currentTransactions = selectTransactionsData(getState());
    const newTransactions = [...creditCardTransactions, ...currentTransactions];
    dispatch(storeTransactionsAsync(newTransactions));
  };

// Selectors
export const selectTransactionsData = (state: RootState) =>
  state.transactions.data;
export const selectTransactionsStatus = (state: RootState) =>
  state.transactions.status;
export const selectTransactionsTotal = (state: RootState) =>
  state.transactions.total;

export default transactionsSlice.reducer;
