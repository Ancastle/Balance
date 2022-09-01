import * as React from "react";
import { isSameMonth, parseISO, format } from "date-fns";

// Types
import { Transaction } from "../../types";

// Utils
import { calculateTotal } from "../../utils";

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../../store";
import { DisplayData } from "./DisplayData";

interface MonthTotalsProps {
  transactions: Transaction[];
  transactionType: string;
  selectedMonth: string;
  lastSixMonths: Date[];
}

export const MonthTotals: React.FC<MonthTotalsProps> = ({
  transactions,
  transactionType,
  selectedMonth,
  lastSixMonths,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const currentMonthInDate = React.useMemo(
    () =>
      selectedMonth === "currentMonth"
        ? new Date()
        : lastSixMonths[parseInt(selectedMonth, 10)],
    [selectedMonth, lastSixMonths]
  );

  const transactionsCurrentMonth = React.useMemo(
    () =>
      transactions.filter((tr) =>
        isSameMonth(parseISO(tr.date), currentMonthInDate)
      ),
    [transactions, currentMonthInDate]
  );

  const dataToShow = React.useMemo(() => {
    if (transactionType === "expence") {
      let onlyExpences = transactionsCurrentMonth.filter(
        (tr) => tr.type === "expence"
      );
      let onlyNecessaryExpences = onlyExpences.filter((tr) => tr.isNecesary);
      let onlyUnnecessaryExpences = onlyExpences.filter((tr) => !tr.isNecesary);
      return [
        {
          name: "Type",
          data1: `${format(currentMonthInDate, "MM/yyyy")}`,
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
  }, [transactionsCurrentMonth]);

  const data = React.useMemo(
    () => [{ title: "Necessary/Unnecessary", data: dataToShow }],
    [dataToShow]
  );

  return <DisplayData data={data} />;
};
