import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import formatISO from "date-fns/formatISO";

import { HistoryRegister } from "../components/types";
import { RootState, AppThunk } from "./store";

import { STORAGE } from "../components/statics";

export interface HistoryState {
  data: HistoryRegister[];
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
  async (newHistory: HistoryRegister[]) => {
    try {
      const jsonValue = JSON.stringify({ history: newHistory });
      await AsyncStorage.setItem(STORAGE.history, jsonValue);
    } catch (e) {
      console.log("Error: Could not store history data");
    }
    return newHistory;
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
      })
      .addCase(storeHistoryAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(storeHistoryAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(storeHistoryAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// Thunks
export const addHistoryRegister =
  (idenfitierName: string, newRegisterName: string): AppThunk =>
  (dispatch, getState) => {
    const currentHistory = selectHistoryData(getState());
    const newRegister = {
      name: `${idenfitierName} ${newRegisterName}`,
      date: formatISO(new Date()),
    };
    const newHistory = [newRegister, ...currentHistory];
    dispatch(storeHistoryAsync(newHistory));
  };

// Selectors
export const selectHistoryData = (state: RootState) => state.history.data;
export const selectHistoryStatus = (state: RootState) => state.history.status;

export default historySlice.reducer;
