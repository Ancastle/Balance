import * as React from "react";

import {
  parseISO,
  isBefore,
  isAfter,
  endOfMonth,
  startOfMonth,
  format,
} from "date-fns";

// Components
import { DisplayData } from "./DisplayData";

// Utils
import { calculateTotal } from "../../utils";

// Store
import {
  selectPreferencesLanguage,
  selectTransactionsData,
  selectCategoriesData,
  useAppSelector,
} from "../../../store";

interface FromToTotalsProps {
  transactionType: string;
  monthFrom: string;
  monthTo: string;
  lastSixMonths: Date[];
  sorting: string;
}

export const FromToTotals: React.FC<FromToTotalsProps> = ({
  transactionType,
  monthFrom,
  monthTo,
  lastSixMonths,
  sorting,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  const categories = useAppSelector(selectCategoriesData);
  const transactions = useAppSelector(selectTransactionsData);

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

  const currentPeriodData = React.useMemo(() => {
    const onlyExpences = transactionsCurrentPeriod.filter(
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
        transactionsCurrentPeriod.filter((tr) => tr.categoryId === cat.id),
        transactionType
      ),
    }));
    return {
      onlyExpences,
      onlyNecessaryExpences,
      onlyUnnecessaryExpences,
      transactionsByCategory,
    };
  }, [transactionsCurrentPeriod, transactionType]);

  const dataToShow = React.useMemo(() => {
    if (transactionType === "expence" && sorting === "necessary") {
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
          data1: calculateTotal(
            currentPeriodData.onlyNecessaryExpences,
            "expence"
          ),
        },
        {
          name: "Unnecessary",
          data1: calculateTotal(
            currentPeriodData.onlyUnnecessaryExpences,
            "expence"
          ),
        },
        {
          name: "Total",
          data1: calculateTotal(currentPeriodData.onlyExpences, "expence"),
        },
      ];
    } else {
      return [
        {
          name: "Category",
          data1: `From ${format(currentMonthFromInDate, "MM/yyyy")} to ${format(
            currentMonthToInDate,
            "MM/yyyy"
          )}`,
        },
        ...currentPeriodData.transactionsByCategory,
        {
          name: "Total",
          data1: currentPeriodData.transactionsByCategory.reduce(
            (acc, cat) => acc + cat.data1,
            0
          ),
        },
      ];
    }
  }, [transactionsCurrentPeriod, transactionType, sorting]);

  const data = React.useMemo(
    () => [{ title: "Necessary/Unnecessary fromTo", data: dataToShow }],
    [dataToShow]
  );

  return <DisplayData data={data} />;
};
