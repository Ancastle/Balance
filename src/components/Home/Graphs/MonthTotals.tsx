import * as React from "react";
import { isSameMonth, parseISO, format } from "date-fns";

// Components
import { DisplayData } from "./DisplayData";

// Utils
import { calculateTotal } from "../../utils";

// Store
import {
  selectCategoriesData,
  selectPreferencesLanguage,
  selectTransactionsData,
  useAppSelector,
} from "../../../store";

interface MonthTotalsProps {
  transactionType: string;
  selectedMonth: string;
  lastSixMonths: Date[];
  sorting: string;
}

export const MonthTotals: React.FC<MonthTotalsProps> = ({
  transactionType,
  selectedMonth,
  lastSixMonths,
  sorting,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  const categories = useAppSelector(selectCategoriesData);
  const transactions = useAppSelector(selectTransactionsData);

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

  const currentMonthData = React.useMemo(() => {
    const onlyExpences = transactionsCurrentMonth.filter(
      (tr) => tr.type === "expence"
    );
    const onlyNecessaryExpences = onlyExpences.filter((tr) => tr.isNecesary);
    const onlyUnnecessaryExpences = onlyExpences.filter((tr) => !tr.isNecesary);

    const typeCategoriesOnly = categories.filter(
      (cat) => cat.type === transactionType
    );
    const transactionsByCategory = typeCategoriesOnly.map((cat) => ({
      name: cat.name,
      data1: calculateTotal(
        transactionsCurrentMonth.filter((tr) => tr.categoryId === cat.id),
        transactionType
      ),
    }));
    return {
      onlyExpences,
      onlyNecessaryExpences,
      onlyUnnecessaryExpences,
      transactionsByCategory,
    };
  }, [transactionsCurrentMonth, transactionType]);

  const dataToShow = React.useMemo(() => {
    if (transactionType === "expence" && sorting === "necessary") {
      return [
        {
          name: "Type",
          data1: `${format(currentMonthInDate, "MM/yyyy")}`,
        },
        {
          name: "Necessary",
          data1: calculateTotal(
            currentMonthData.onlyNecessaryExpences,
            "expence"
          ),
        },
        {
          name: "Unnecessary",
          data1: calculateTotal(
            currentMonthData.onlyUnnecessaryExpences,
            "expence"
          ),
        },
        {
          name: "Total",
          data1: calculateTotal(currentMonthData.onlyExpences, "expence"),
        },
      ];
    } else {
      return [
        {
          name: "Category",
          data1: `${format(currentMonthInDate, "MM/yyyy")}`,
        },
        ...currentMonthData.transactionsByCategory,
        {
          name: "Total",
          data1: currentMonthData.transactionsByCategory.reduce(
            (acc, cat) => acc + cat.data1,
            0
          ),
        },
      ];
    }
  }, [transactionsCurrentMonth, sorting, transactionType]);

  const data = React.useMemo(
    () => [{ title: "Necessary/Unnecessary", data: dataToShow }],
    [dataToShow]
  );

  return <DisplayData data={data} />;
};
