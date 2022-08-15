import * as React from "react";
import { Container, Heading, Text, View, Pressable } from "native-base";

// Store
import {
  selectTransactionsData,
  useAppSelector,
  useAppDispatch,
} from "../../../store";

import { DEVONLYRESETTRANSACTIONS } from "../../../store/transactionsSlice";

// Utils
// import { getMonthSummary } from "../../utils";

const HomeScreen: React.FC = () => {
  const transactions = useAppSelector(selectTransactionsData);

  const dispatch = useAppDispatch();

  const date: Date = React.useMemo(() => new Date(), [transactions]);

  // const currentMonth: Month = React.useMemo(
  //   () => ({ month: date.getMonth(), year: date.get }),
  //   [date]
  // );
  // const lastMonth: Month = React.useMemo(() => {
  //   new Date();
  // }, [date]);

  // const lastMonthSummary: MonthSummary = React.useMemo(() => {
  //   return getMonthSummary({ month: 0, year: 2020 }, transactions);
  // }, [lastMonth, transactions]);

  //   const currentMonthSummary: MonthSummary = getMonthSummary(currentMonth, transactions);

  return (
    <>
      <View flex={1}>{/*TBD INSERT LOGO */}</View>
      <Container flex={1} my={15}>
        <Heading>Welcome!</Heading>
        <Heading fontSize={20}>Last month summary</Heading>
        <Text fontWeight="medium">
          NativeBase is a simple{"\n"}, modular and accessible{"\n"} component
          library that gives you
        </Text>
        <Heading fontSize={20}>Current month summary</Heading>
        <Text fontWeight="medium">
          NativeBase is a simple{"\n"}, modular and accessible{"\n"} component
          library that gives you
        </Text>
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
