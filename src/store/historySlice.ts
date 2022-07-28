import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Transaction, TransactionInput } from "../components/types";
import { RootState, AppThunk } from "./store";

import { STORAGE } from "../components/statics";

export interface HistoryState {
  data: Transaction[];
  status: string;
}

const initialState: HistoryState = {
  data: [],
  status: "idle",
};

// Async

export const fetchHistoryAsync = createAsyncThunk(
  "history/fetchHistory",
  async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE.history);
      if (value) {
        const parsed = JSON.parse(value).history;
        return parsed;
      }
    } catch (e) {
      console.log("Error: Could not fetch history data");
    }
  }
);

export const storeHistoryAsync = createAsyncThunk(
  "history/storeHistoryAsync",
  async (newHistory: Transaction[]) => {
    try {
      const jsonValue = JSON.stringify({ history: newHistory });
      await AsyncStorage.setItem(STORAGE.history, jsonValue);
    } catch (e) {
      console.log("Error: Could not store history data");
    }
  }
);

// Slice

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchHistoryAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchHistoryAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchHistoryAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// Thunks

// Selectors

export const selectHistoryData = (state: RootState) => state.history.data;

export const selectHistoryStatus = (state: RootState) => state.history.status;

export default historySlice.reducer;
