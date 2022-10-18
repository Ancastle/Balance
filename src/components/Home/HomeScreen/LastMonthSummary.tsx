import * as React from "react";
import { Heading } from "native-base";
import {
  subMonths,
  startOfMonth,
  endOfMonth,
  parseISO,
  isAfter,
  isBefore,
  format,
} from "date-fns";

import { title2Styles } from "../../styles";

import MonthSummary from "./MonthSummary";

// Store
import {
  selectTransactionsData,
  selectCreditCardData,
  selectPreferencesLanguage,
  selectPreferencesDateFormat,
  useAppSelector,
} from "../../../store";

import { calculateTypeTotal } from "../../utils";

import { LANGUAGES } from "../../statics";

const LastMonthSummary: React.FC = () => {
  const creditCardTransactions = useAppSelector(selectCreditCardData);
  const transactions = useAppSelector(selectTransactionsData);
  const dateFormat = useAppSelector(selectPreferencesDateFormat);

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

  const startingDate = React.useMemo(
    () => format(lastMonthFirstDay, `${dateFormat}/yyyy`),
    [lastMonthFirstDay]
  );

  const endingDate = React.useMemo(
    () => format(lastMonthLastDay, `${dateFormat}/yyyy`),
    [lastMonthLastDay]
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

  const lastMonthNeededExpences = React.useMemo(
    () =>
      calculateTypeTotal(
        lastMonthTransactions.filter(
          (tr) => tr.type === "expence" && tr.isNecesary === true
        ),
        "expence"
      ),
    [transactions]
  );

  const lastMonthCCTransactions = React.useMemo(
    () =>
      creditCardTransactions.filter((transaction) => {
        return (
          isAfter(parseISO(transaction.date), lastMonthFirstDay) &&
          isBefore(parseISO(transaction.date), lastMonthLastDay)
        );
      }),
    [lastMonthFirstDay, lastMonthLastDay, creditCardTransactions]
  );

  const lastMonthCCExpences = React.useMemo(
    () => calculateTypeTotal(lastMonthCCTransactions, "expence"),
    [lastMonthCCTransactions]
  );

  const lastMonthCCNeededExpences = React.useMemo(
    () =>
      calculateTypeTotal(
        lastMonthCCTransactions.filter(
          (tr) => tr.type === "expence" && tr.isNecesary === true
        ),
        "expence"
      ),
    [lastMonthCCTransactions]
  );

  return (
    <MonthSummary
      title={
        <Heading
          w="380"
          fontSize={title2Styles.fontSize}
          fontWeight={title2Styles.fontWeight}
        >
          {`${LANGUAGES.lastMonthSummary[appLanguage]} \n(${startingDate} - ${endingDate})`}
        </Heading>
      }
      neededExpences={lastMonthNeededExpences + lastMonthCCNeededExpences}
      expences={lastMonthExpences + lastMonthCCExpences}
      entries={lastMonthEntries}
      balance={lastMonthBalance}
    />
  );
};
export default LastMonthSummary;
