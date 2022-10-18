import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sub, startOfMonth, formatISO, isAfter, parseISO } from "date-fns";

import { Transaction, TransactionInput } from "../components/types";
import { RootState, AppThunk } from "./store";

import { STORAGE } from "../components/statics";

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
        const parsed = JSON.parse(value);
        return parsed;
      }
    } catch (e) {
      console.log("Error: Could not fetch transactions data");
    }
  }
);

export const storeTransactionsAsync = createAsyncThunk(
  "transactions/storeTransactions",
  async (newTransactionState: {
    transactions: Transaction[];
    total: number;
  }) => {
    const threeMonthsBefore = startOfMonth(sub(new Date(), { months: 3 }));
    const filteredNewTransactions = [
      ...newTransactionState.transactions,
    ].filter((transaction) =>
      isAfter(parseISO(transaction.date), threeMonthsBefore)
    );
    try {
      const jsonValue = JSON.stringify({
        transactions: filteredNewTransactions,
        total: newTransactionState.total,
      });
      await AsyncStorage.setItem(STORAGE.transactions, jsonValue);
    } catch (e) {
      console.log("Error: Could not store transactions data");
    }
    return {
      transactions: filteredNewTransactions,
      total: newTransactionState.total,
    };
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
      .addCase(fetchTransactionsAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload.transactions;
        state.total = action.payload.total;
      })
      .addCase(fetchTransactionsAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(storeTransactionsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(storeTransactionsAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload.transactions;
        state.total = action.payload.total;
      })
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
    const currentTotal = selectTransactionsTotal(getState());
    const transaction: Transaction = {
      ...newTransaction,
      id: uuid.v4(),
      date: formatISO(new Date()),
    };
    const newTransactions = [transaction, ...currentTransactions];
    const newTotal =
      transaction.type === "entry"
        ? currentTotal + parseInt(transaction.value)
        : currentTotal - parseInt(transaction.value);
    const newTransactionsState = {
      transactions: newTransactions,
      total: newTotal,
    };
    dispatch(storeTransactionsAsync(newTransactionsState));
  };

export const editTransaction =
  (editingTransaction: Transaction, originalValue: string): AppThunk =>
  (dispatch, getState) => {
    const currentTransactions = selectTransactionsData(getState());
    const currentTotal = selectTransactionsTotal(getState());
    const originalValueNumber = parseInt(originalValue, 10);
    const newValueNumber = parseInt(editingTransaction.value, 10);
    const difference =
      editingTransaction.type === "entry"
        ? newValueNumber - originalValueNumber
        : originalValueNumber - newValueNumber;
    const newTransactions = currentTransactions.map((t) => {
      if (t.id === editingTransaction.id) {
        return {
          ...t,
          name: editingTransaction.name,
          value: editingTransaction.value,
          categoryId: editingTransaction.categoryId,
          isNecesary: editingTransaction.isNecesary,
        };
      } else {
        return t;
      }
    });
    const newTransactionsState = {
      transactions: newTransactions,
      total: currentTotal + difference,
    };
    dispatch(storeTransactionsAsync(newTransactionsState));
  };

export const addCreditCardPayment =
  (creditCardTransactions: Transaction[]): AppThunk =>
  (dispatch, getState) => {
    const currentTransactions = selectTransactionsData(getState());
    const currentTotal = selectTransactionsTotal(getState());
    const newTransactions = [...creditCardTransactions, ...currentTransactions];
    const totalExpence = [...creditCardTransactions].reduce(
      (sum, { value }) => sum + parseInt(value),
      0
    );
    const newTransactionsState = {
      transactions: newTransactions,
      total: currentTotal - totalExpence,
    };
    dispatch(storeTransactionsAsync(newTransactionsState));
  };

// Selectors
export const selectTransactionsData = (state: RootState) =>
  state.transactions.data;
export const selectTransactionsStatus = (state: RootState) =>
  state.transactions.status;
export const selectTransactionsTotal = (state: RootState) =>
  state.transactions.total;

export default transactionsSlice.reducer;
