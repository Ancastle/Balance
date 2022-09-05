import * as React from "react";
import { Heading, Box } from "native-base";
import { TextInput } from "react-native";
import { sub, startOfMonth, parseISO, isAfter, format } from "date-fns";

import { title2Styles } from "../../styles";

import MonthSummary from "./MonthSummary";

// Store
import {
  selectTransactionsData,
  selectCreditCardData,
  selectPreferencesLanguage,
  selectPreferencesDateFormat,
  useAppSelector,
  selectPreferencesPastDaysDefault,
} from "../../../store";

import { calculateTypeTotal } from "../../utils";

import { LANGUAGES } from "../../statics";

const LastDaysSummary: React.FC = () => {
  const creditCardTransactions = useAppSelector(selectCreditCardData);
  const transactions = useAppSelector(selectTransactionsData);
  const dateFormat = useAppSelector(selectPreferencesDateFormat);
  const pastDaysDefault = useAppSelector(selectPreferencesPastDaysDefault);

  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const [days, setDays] = React.useState("15");

  const today: Date = React.useMemo(() => new Date(), [transactions]);

  const periodFirstDay = React.useMemo(
    () => sub(today, { days: parseInt(days) }),
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

  const startingDate = React.useMemo(
    () => format(periodFirstDay, `${dateFormat}/yyyy`),
    [[periodFirstDay]]
  );

  const endingDate = React.useMemo(
    () => format(new Date(), `${dateFormat}/yyyy`),
    []
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

  const lastDaysCCTransactions = React.useMemo(
    () =>
      creditCardTransactions.filter((transaction) => {
        return isAfter(parseISO(transaction.date), periodFirstDay);
      }),
    [periodFirstDay, creditCardTransactions]
  );

  const lastDaysCCExpences = React.useMemo(
    () => calculateTypeTotal(lastDaysCCTransactions, "expence"),
    [lastDaysCCTransactions]
  );

  const lastDaysCCNeededExpences = React.useMemo(
    () =>
      calculateTypeTotal(
        lastDaysCCTransactions.filter(
          (tr) => tr.type === "expence" && tr.isNecesary === true
        ),
        "expence"
      ),
    [lastDaysCCTransactions]
  );

  React.useEffect(() => setDays(pastDaysDefault.toString()), [pastDaysDefault]);
  return (
    <MonthSummary
      title={
        <Heading
          w="380"
          fontSize={title2Styles.fontSize}
          fontWeight={title2Styles.fontWeight}
        >
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
                fontSize: 16,
                left: -20,
                width: 45,
                fontWeight: "600",
                paddingRight: 0,
              }}
            />
          </Box>
          {LANGUAGES.lastDays2[appLanguage]}
          {`\n(${startingDate} - ${endingDate})`}
        </Heading>
      }
      neededExpences={lastDaysNeededExpences + lastDaysCCNeededExpences}
      expences={lastDaysExpences + lastDaysCCExpences}
      entries={lastDaysEntries}
      balance={lastDaysBalance}
    />
  );
};
export default LastDaysSummary;
