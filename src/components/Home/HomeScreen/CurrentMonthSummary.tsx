import * as React from "react";
import { Heading } from "native-base";
import {
  startOfMonth,
  endOfMonth,
  parseISO,
  isAfter,
  isBefore,
} from "date-fns";

import MonthSummary from "./MonthSummary";

// Store
import {
  selectTransactionsData,
  useAppSelector,
  selectPreferencesLanguage,
} from "../../../store";

import { calculateTypeTotal } from "../../utils";

import { LANGUAGES } from "../../statics";

const CurrentMonthSummary: React.FC = () => {
  const transactions = useAppSelector(selectTransactionsData);

  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const date: Date = React.useMemo(() => new Date(), [transactions]);

  const currentMonthFirstDay = React.useMemo(() => startOfMonth(date), [date]);

  const currentMonthLastDay = React.useMemo(() => endOfMonth(date), [date]);

  const currentMonthTransactions = React.useMemo(
    () =>
      transactions.filter((transaction) => {
        return (
          isAfter(parseISO(transaction.date), currentMonthFirstDay) &&
          isBefore(parseISO(transaction.date), currentMonthLastDay)
        );
      }),
    [currentMonthFirstDay, currentMonthLastDay]
  );

  const currentMonthExpences = React.useMemo(
    () => calculateTypeTotal(currentMonthTransactions, "expence"),
    [currentMonthTransactions]
  );

  const currentMonthEntries = React.useMemo(
    () => calculateTypeTotal(currentMonthTransactions, "entry"),
    [currentMonthTransactions]
  );

  const currentMonthBalance = React.useMemo(
    () => currentMonthEntries - currentMonthExpences,
    [currentMonthEntries, currentMonthExpences]
  );

  return (
    <MonthSummary
      title={
        <Heading fontSize={20}>
          {LANGUAGES.currentMonthSummary[appLanguage]}
        </Heading>
      }
      expences={currentMonthExpences}
      entries={currentMonthEntries}
      balance={currentMonthBalance}
    />
  );
};
export default CurrentMonthSummary;
