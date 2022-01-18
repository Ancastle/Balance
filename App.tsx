//Externals
import React from "react";
import { Box, NativeBaseProvider } from "native-base";

//Components
import AppRouter from "./components/ApplicationLayout/AppRouter";

export default function App() {
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="white">
        <AppRouter />
      </Box>
    </NativeBaseProvider>
  );
}
