// Externals
import React from "react";
import { Box, NativeBaseProvider } from "native-base";

// Components
import AppRouter from "./components/ApplicationLayout/AppRouter";

// Context Providers
import { CategoriesContextProvider } from "./components/Contexts/CategoriesContextProvider";
import { TransactionsContextProvider } from "./components/Contexts/TransactionsContextProvider";
import { PreferencesContextProvider } from "./components/Contexts/PreferencesContextProvider";

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
