import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Person, UuId } from "../components/types";
import { RootState, AppThunk } from "./store";

import { STORAGE } from "../components/statics";

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
  (personId: UuId, value: number, whoPays: string): AppThunk =>
  (dispatch, getState) => {
    const currentPeople = selectPeopleData(getState());
    const newPeople = currentPeople.map((person) =>
      person.id === personId
        ? {
            ...person,
            value:
              whoPays === "me"
                ? (parseInt(person.value, 10) + value).toString()
                : (parseInt(person.value, 10) - value).toString(),
          }
        : person
    );
    dispatch(storePeopleAsync(newPeople));
  };

// Selectors
export const selectPeopleData = (state: RootState) => state.people.data;
export const selectPeopleStatus = (state: RootState) => state.people.status;

export default peopleSlice.reducer;
