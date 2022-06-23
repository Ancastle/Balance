// Externals
import React from "react";
import { Box, NativeBaseProvider } from "native-base";

// Components
import AppRouter from "./components/ApplicationLayout";

// Context Providers
import {
  CategoriesContextProvider,
  TransactionsContextProvider,
  PreferencesContextProvider,
  CreditCardContextProvider,
  PeopleContextProvider,
  HistoryContextProvider,
} from "./components/Contexts";

export default function App() {
  return (
    <NativeBaseProvider>
      <HistoryContextProvider>
        <TransactionsContextProvider>
          <CategoriesContextProvider>
            <PreferencesContextProvider>
              <CreditCardContextProvider>
                <PeopleContextProvider>
                  <Box flex={1} bg="white">
                    <AppRouter />
                  </Box>
                </PeopleContextProvider>
              </CreditCardContextProvider>
            </PreferencesContextProvider>
          </CategoriesContextProvider>
        </TransactionsContextProvider>
      </HistoryContextProvider>
    </NativeBaseProvider>
  );
}
