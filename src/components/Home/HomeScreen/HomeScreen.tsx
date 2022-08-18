import * as React from "react";
import { Container, Heading, Text, View, Pressable } from "native-base";

import LastMonthSummary from "./LastMonthSummary";
import CurrentMonthSummary from "./CurrentMonthSummary";
import LastDaysSummary from "./LastDaysSummary";
import LastAction from "./LastAction";

// Store
import {
  useAppSelector,
  useAppDispatch,
  selectPreferencesLanguage,
} from "../../../store";

import { DEVONLYRESETTRANSACTIONS } from "../../../store/transactionsSlice";

import { LANGUAGES } from "../../statics";

// Utils
// import { getMonthSummary } from "../../utils";

const HomeScreen: React.FC = () => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const dispatch = useAppDispatch();

  return (
    <>
      <View flex={1}>{/*TBD INSERT LOGO */}</View>
      <Container flex={1.3} my={15}>
        <Heading>{`${LANGUAGES.welcome[appLanguage]}!`}</Heading>
        <LastAction />
        <LastDaysSummary />
        <LastMonthSummary />
        <CurrentMonthSummary />

        {/* DEVONLY*/}
        <Pressable
          fontWeight="medium"
          onPress={() => {
            dispatch(DEVONLYRESETTRANSACTIONS());
          }}
        >
          <Text> RESET ALL REGISTERS</Text>
        </Pressable>
      </Container>
    </>
  );
};
export default HomeScreen;
