import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Transaction, TransactionInput } from "../components/types";
import { RootState, AppThunk } from "./store";

import { STORAGE } from "../components/statics";

export interface PeopleState {
  data: Transaction[];
  status: string;
}

const initialState: PeopleState = {
  data: [],
  status: "idle",
};

// Async

export const fetchPeopleAsync = createAsyncThunk(
  "people/fetchPeople",
  async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE.people);
      if (value) {
        const parsed = JSON.parse(value).people;
        return parsed;
      }
    } catch (e) {
      console.log("Error: Could not fetch people data");
    }
  }
);

export const storePeopleAsync = createAsyncThunk(
  "people/storePeopleAsync",
  async (newPeople: Transaction[]) => {
    try {
      const jsonValue = JSON.stringify({ people: newPeople });
      await AsyncStorage.setItem(STORAGE.people, jsonValue);
    } catch (e) {
      console.log("Error: Could not store people data");
    }
  }
);

// Slice

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPeopleAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPeopleAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchPeopleAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// Thunks

// Selectors

export const selectPeopleData = (state: RootState) => state.people.data;

export const selectPeopleStatus = (state: RootState) => state.people.status;

export default peopleSlice.reducer;
