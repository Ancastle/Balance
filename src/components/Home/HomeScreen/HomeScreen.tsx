import * as React from "react";
import { Container, Heading, Text, View, Pressable } from "native-base";

// Store
import {
  useAppSelector,
  useAppDispatch,
  selectPreferencesLanguage,
} from "../../../store";

import { DEVONLYRESETTRANSACTIONS } from "../../../store/transactionsSlice";

import LastMonthSummary from "./LastMonthSummary";
import CurrentMonthSummary from "./CurrentMonthSummary";
import LastDaysSummary from "./LastDaysSummary";

import { LANGUAGES } from "../../statics";

// Utils
// import { getMonthSummary } from "../../utils";

const HomeScreen: React.FC = () => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const dispatch = useAppDispatch();

  return (
    <>
      <View flex={1}>{/*TBD INSERT LOGO */}</View>
      <Container flex={1} my={15}>
        <Heading>{`${LANGUAGES.welcome[appLanguage]}!`}</Heading>
        <LastDaysSummary />
        <LastMonthSummary />
        <CurrentMonthSummary />

        {/* DEVONLY*/}
        <Pressable
          fontWeight="medium"
          onPress={() => {
            console.log("happened");
            dispatch(DEVONLYRESETTRANSACTIONS());
          }}
        >
          <Text> RESET ALL REGISTERS</Text>
        </Pressable>
        {/* <Heading fontSize={20}>Your last movement</Heading>
        <Text fontWeight="medium">
          NativeBase is a simple{"\n"}, modular and accessible{"\n"} component
          library that gives you
        </Text> */}
      </Container>
    </>
  );
};
export default HomeScreen;
