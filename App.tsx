// Externals
import React from "react";
import { Box, NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";

// Components
import AppRouter from "./src/components/ApplicationLayout";

// Store
import { store } from "./src/app/store";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Box flex={1} bg="white">
          <AppRouter />
        </Box>
      </NativeBaseProvider>
    </Provider>
  );
}
