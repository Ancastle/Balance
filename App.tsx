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
} from "./components/Contexts";

export default function App() {
  return (
    <NativeBaseProvider>
      <TransactionsContextProvider>
        <CategoriesContextProvider>
          <PreferencesContextProvider>
            <Box flex={1} bg="white">
              <AppRouter />
            </Box>
          </PreferencesContextProvider>
        </CategoriesContextProvider>
      </TransactionsContextProvider>
    </NativeBaseProvider>
  );
}
