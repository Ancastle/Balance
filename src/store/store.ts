import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";
import categoriesReducer from "./categoriesSlice";
import creditCardReducer from "./creditCardSlice";
import peopleReducer from "./peopleSlice";
import preferencesReducer from "./preferencesSlice";
import historyReducer from "./historySlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    categories: categoriesReducer,
    creditCard: creditCardReducer,
    people: peopleReducer,
    preferences: preferencesReducer,
    history: historyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
