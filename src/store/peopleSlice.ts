import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Person,
  Transaction,
  TransactionType,
  UuId,
} from "../components/types";
import { RootState, AppThunk } from "./store";

import { STORAGE } from "../components/statics";
import { formatISO } from "date-fns";

export interface PeopleState {
  data: Person[];
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
      } else {
        return [];
      }
    } catch (e) {
      console.log("Error: Could not fetch people data");
    }
  }
);

export const storePeopleAsync = createAsyncThunk(
  "people/storePeopleAsync",
  async (newPeople: Person[]) => {
    try {
      const jsonValue = JSON.stringify({ people: newPeople });
      await AsyncStorage.setItem(STORAGE.people, jsonValue);
    } catch (e) {
      console.log("Error: Could not store people data");
    }
    return newPeople;
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
      })
      .addCase(storePeopleAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(storePeopleAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(storePeopleAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// Thunks
export const addPerson =
  (personName: string): AppThunk =>
  (dispatch, getState) => {
    const currentPeople = selectPeopleData(getState());
    const newPeople = [
      {
        name: personName,
        id: uuid.v4(),
        value: "0",
        transactions: [],
      },
      ...currentPeople,
    ];
    dispatch(storePeopleAsync(newPeople));
  };

// Not beeing used right now
// export const editPerson =
//   (newPersonName: string, personId: UuId): AppThunk =>
//   (dispatch, getState) => {
//     const currentPeople = selectPeopleData(getState());
//     const newPeople = currentPeople.map((person) => {
//       if (person.id === personId) {
//         return { ...person, name: newPersonName };
//       } else {
//         return person;
//       }
//     });
//     dispatch(storePeopleAsync(newPeople));
//   };

export const deletePerson =
  (personId: UuId): AppThunk =>
  (dispatch, getState) => {
    const currentPeople = selectPeopleData(getState());
    const newPeople = currentPeople.filter((person) => person.id !== personId);
    dispatch(storePeopleAsync(newPeople));
  };

export const addPersonTransaction =
  (personId: UuId, value: number, whoPays: string, reason: string): AppThunk =>
  (dispatch, getState) => {
    const currentPeople = selectPeopleData(getState());
    const transType: TransactionType = whoPays === "me" ? "expence" : "entry";
    const newPeople = currentPeople.map((person) => {
      let newValue = "0";
      let newTransactions: Transaction[] = [];
      if (person.id === personId) {
        newValue =
          whoPays === "me"
            ? (parseInt(person.value, 10) + value).toString()
            : (parseInt(person.value, 10) - value).toString();
        newTransactions = [
          {
            id: uuid.v4(),
            type: transType,
            name: reason,
            categoryId: whoPays === "me" ? "expence1" : "entry1",
            value:
              whoPays === "me" ? value.toString() : (value * -1).toString(),
            date: formatISO(new Date()),
            isNecesary: false,
          },
          ...(person.transactions || []),
        ];
        if (newTransactions.length > 20) {
          newTransactions = newTransactions.slice(0, 19);
        }
      }

      return person.id === personId
        ? {
            ...person,
            transactions: newTransactions,
            value: newValue,
          }
        : person;
    });
    dispatch(storePeopleAsync(newPeople));
  };

// Selectors
export const selectPeopleData = (state: RootState) => state.people.data;
export const selectPeopleStatus = (state: RootState) => state.people.status;

export default peopleSlice.reducer;
