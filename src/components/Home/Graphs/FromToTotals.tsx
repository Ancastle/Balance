import * as React from "react";

import {
  parseISO,
  isBefore,
  isAfter,
  endOfMonth,
  startOfMonth,
  format,
} from "date-fns";

// Types
import { Transaction } from "../../types";

// Utils
import { calculateTotal } from "../../utils";

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../../store";
import { DisplayData } from "./DisplayData";

interface FromToTotalsProps {
  transactions: Transaction[];
  transactionType: string;
  monthFrom: string;
  monthTo: string;
  lastSixMonths: Date[];
}

export const FromToTotals: React.FC<FromToTotalsProps> = ({
  transactions,
  transactionType,
  monthFrom,
  monthTo,
  lastSixMonths,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const currentMonthFromInDate = React.useMemo(
    () =>
      monthFrom === "currentMonth"
        ? new Date()
        : startOfMonth(lastSixMonths[parseInt(monthFrom, 10)]),
    [monthFrom, lastSixMonths]
  );

  const currentMonthToInDate = React.useMemo(
    () =>
      monthTo === "currentMonth"
        ? new Date()
        : endOfMonth(lastSixMonths[parseInt(monthTo, 10)]),
    [monthTo, lastSixMonths]
  );

  const transactionsCurrentPeriod = React.useMemo(
    () =>
      transactions.filter((tr) => {
        const transDate = parseISO(tr.date);
        return (
          isAfter(transDate, currentMonthFromInDate) &&
          isBefore(transDate, currentMonthToInDate)
        );
      }),
    [transactions, currentMonthFromInDate, currentMonthToInDate]
  );

  const dataToShow = React.useMemo(() => {
    if (transactionType === "expence") {
      let onlyExpences = transactionsCurrentPeriod.filter(
        (tr) => tr.type === "expence"
      );
      let onlyNecessaryExpences = onlyExpences.filter((tr) => tr.isNecesary);
      let onlyUnnecessaryExpences = onlyExpences.filter((tr) => !tr.isNecesary);
      return [
        {
          name: "Type",
          data1: `From ${format(currentMonthFromInDate, "MM/yyyy")} to ${format(
            currentMonthToInDate,
            "MM/yyyy"
          )}`,
        },
        {
          name: "Necessary",
          data1: calculateTotal(onlyNecessaryExpences, "expence"),
        },
        {
          name: "Unnecessary",
          data1: calculateTotal(onlyUnnecessaryExpences, "expence"),
        },
      ];
    } else {
      return [];
    }
  }, [transactionsCurrentPeriod]);

  const data = React.useMemo(
    () => [{ title: "Necessary/Unnecessary fromTo", data: dataToShow }],
    [dataToShow]
  );

  return <DisplayData data={data} />;
};
