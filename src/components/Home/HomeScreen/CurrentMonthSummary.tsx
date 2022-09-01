import * as React from "react";
import { Heading } from "native-base";
import {
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
  selectPreferencesLanguage,
  selectCreditCardData,
  selectTransactionsData,
  useAppSelector,
} from "../../../store";

import { calculateTypeTotal } from "../../utils";

import { LANGUAGES } from "../../statics";

const CurrentMonthSummary: React.FC = () => {
  const creditCardTransactions = useAppSelector(selectCreditCardData);
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
    [currentMonthFirstDay, currentMonthLastDay, transactions]
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

  const startingDate = React.useMemo(
    () => format(currentMonthFirstDay, "dd/MM/yyyy"),
    [currentMonthFirstDay]
  );

  const endingDate = React.useMemo(
    () => format(currentMonthLastDay, "dd/MM/yyyy"),
    [currentMonthLastDay]
  );

  const currentMonthNeededExpences = React.useMemo(
    () =>
      calculateTypeTotal(
        currentMonthTransactions.filter(
          (tr) => tr.type === "expence" && tr.isNecesary === true
        ),
        "expence"
      ),
    [currentMonthTransactions]
  );

  const currentMonthCCTransactions = React.useMemo(
    () =>
      creditCardTransactions.filter((transaction) => {
        return (
          isAfter(parseISO(transaction.date), currentMonthFirstDay) &&
          isBefore(parseISO(transaction.date), currentMonthLastDay)
        );
      }),
    [currentMonthFirstDay, currentMonthLastDay, creditCardTransactions]
  );

  const currentMonthCCExpences = React.useMemo(
    () => calculateTypeTotal(currentMonthCCTransactions, "expence"),
    [currentMonthCCTransactions]
  );

  const currentMonthCCNeededExpences = React.useMemo(
    () =>
      calculateTypeTotal(
        currentMonthCCTransactions.filter(
          (tr) => tr.type === "expence" && tr.isNecesary === true
        ),
        "expence"
      ),
    [currentMonthCCTransactions]
  );

  return (
    <MonthSummary
      title={
        <Heading
          w="380"
          fontSize={title2Styles.fontSize}
          fontWeight={title2Styles.fontWeight}
        >
          {`${LANGUAGES.currentMonthSummary[appLanguage]} \n(${startingDate} - ${endingDate})`}
        </Heading>
      }
      neededExpences={currentMonthNeededExpences + currentMonthCCNeededExpences}
      expences={currentMonthExpences + currentMonthCCExpences}
      entries={currentMonthEntries}
      balance={currentMonthBalance}
    />
  );
};
export default CurrentMonthSummary;
