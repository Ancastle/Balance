import * as React from "react";
import { Heading, Box } from "native-base";
import { TextInput } from "react-native";
import { sub, startOfMonth, parseISO, isAfter } from "date-fns";

import MonthSummary from "./MonthSummary";

// Store
import {
  selectTransactionsData,
  useAppSelector,
  selectPreferencesLanguage,
} from "../../../store";

import { calculateTypeTotal } from "../../utils";

import { LANGUAGES } from "../../statics";

const LastDaysSummary: React.FC = () => {
  const transactions = useAppSelector(selectTransactionsData);

  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const [days, setDays] = React.useState("15");

  const today: Date = React.useMemo(() => new Date(), [transactions]);

  const periodFirstDay = React.useMemo(
    () => startOfMonth(sub(today, { days: parseInt(days) })),
    [today, days]
  );

  const lastDaysTransactions = React.useMemo(
    () =>
      transactions.filter((transaction) => {
        return isAfter(parseISO(transaction.date), periodFirstDay);
      }),
    [periodFirstDay]
  );

  const lastDaysExpences = React.useMemo(
    () => calculateTypeTotal(lastDaysTransactions, "expence"),
    [lastDaysTransactions]
  );

  const lastDaysEntries = React.useMemo(
    () => calculateTypeTotal(lastDaysTransactions, "entry"),
    [lastDaysTransactions]
  );

  const lastDaysBalance = React.useMemo(
    () => lastDaysEntries - lastDaysExpences,
    [lastDaysExpences, lastDaysEntries]
  );

  const lastDaysNeededExpences = React.useMemo(
    () =>
      calculateTypeTotal(
        transactions.filter(
          (tr) => tr.type === "expence" && tr.isNecesary === true
        ),
        "expence"
      ),
    [transactions]
  );

  return (
    <MonthSummary
      title={
        <Heading fontSize={20}>
          {LANGUAGES.lastDays1[appLanguage]}
          <Box alignItems="center">
            <TextInput
              keyboardType="numeric"
              maxLength={3}
              onChangeText={(text) => setDays(text)}
              value={days}
              style={{
                marginBottom: -5,
                marginLeft: 50,
                fontSize: 20,
                left: -20,
                width: 45,
                fontWeight: "600",
                paddingRight: 0,
              }}
            />
          </Box>
          {LANGUAGES.lastDays2[appLanguage]}
        </Heading>
      }
      neededExpences={lastDaysNeededExpences}
      expences={lastDaysExpences}
      entries={lastDaysEntries}
      balance={lastDaysBalance}
    />
  );
};
export default LastDaysSummary;
