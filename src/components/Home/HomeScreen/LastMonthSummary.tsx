import * as React from "react";
import { Heading } from "native-base";
import {
  subMonths,
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

import { calculateTypeTotal, makeCurrencyFormat } from "../../utils";

import { LANGUAGES } from "../../statics";

const LastMonthSummary: React.FC = () => {
  const transactions = useAppSelector(selectTransactionsData);

  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const date: Date = React.useMemo(() => new Date(), [transactions]);

  const lastMonthFirstDay = React.useMemo(
    () => startOfMonth(subMonths(date, 1)),
    [date]
  );

  const lastMonthLastDay = React.useMemo(
    () => endOfMonth(subMonths(date, 1)),
    [date]
  );

  const lastMonthTransactions = React.useMemo(
    () =>
      transactions.filter((transaction) => {
        return (
          isAfter(parseISO(transaction.date), lastMonthFirstDay) &&
          isBefore(parseISO(transaction.date), lastMonthLastDay)
        );
      }),
    [lastMonthFirstDay, lastMonthLastDay]
  );

  const lastMonthExpences = React.useMemo(
    () => calculateTypeTotal(lastMonthTransactions, "expence"),
    [lastMonthTransactions]
  );

  const lastMonthEntries = React.useMemo(
    () => calculateTypeTotal(lastMonthTransactions, "entry"),
    [lastMonthTransactions]
  );

  const lastMonthBalance = React.useMemo(
    () => lastMonthEntries - lastMonthExpences,
    [lastMonthEntries, lastMonthExpences]
  );

  return (
    <MonthSummary
      title={
        <Heading fontSize={20}>
          {LANGUAGES.lastMonthSummary[appLanguage]}
        </Heading>
      }
      expences={lastMonthExpences}
      entries={lastMonthEntries}
      balance={lastMonthBalance}
    />
  );
};
export default LastMonthSummary;
