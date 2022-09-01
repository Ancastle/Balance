import * as React from "react";

import { parseISO, isSameMonth, format } from "date-fns";

// Components
import { DisplayData } from "./DisplayData";

// Types
import { Transaction } from "../../types";

// Utils
import { calculateTotal } from "../../utils";

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../../store";

interface CompareTotalsProps {
  transactions: Transaction[];
  transactionType: string;
  month1: string;
  month2: string;
  lastSixMonths: Date[];
}

export const CompareTotals: React.FC<CompareTotalsProps> = ({
  transactions,
  transactionType,
  month1,
  month2,
  lastSixMonths,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const currentMonth1InDate = React.useMemo(
    () =>
      month1 === "currentMonth"
        ? new Date()
        : lastSixMonths[parseInt(month1, 10)],
    [month1, lastSixMonths]
  );

  const currentMonth2InDate = React.useMemo(
    () =>
      month2 === "currentMonth"
        ? new Date()
        : lastSixMonths[parseInt(month2, 10)],
    [month2, lastSixMonths]
  );

  const transactionsMonth1 = React.useMemo(
    () =>
      transactions.filter((tr) =>
        isSameMonth(parseISO(tr.date), currentMonth1InDate)
      ),
    [transactions, currentMonth1InDate]
  );

  const transactionsMonth2 = React.useMemo(
    () =>
      transactions.filter((tr) =>
        isSameMonth(parseISO(tr.date), currentMonth2InDate)
      ),
    [transactions, currentMonth2InDate]
  );

  const dataToShow = React.useMemo(() => {
    if (transactionType === "expence") {
      const onlyExpencesMonth1 = transactionsMonth1.filter(
        (tr) => tr.type === "expence"
      );
      const onlyExpencesMonth2 = transactionsMonth2.filter(
        (tr) => tr.type === "expence"
      );
      const onlyNecessaryExpences1 = onlyExpencesMonth1.filter(
        (tr) => tr.isNecesary
      );
      const onlyUnnecessaryExpences1 = onlyExpencesMonth1.filter(
        (tr) => !tr.isNecesary
      );
      const onlyNecessaryExpences2 = onlyExpencesMonth2.filter(
        (tr) => tr.isNecesary
      );
      const onlyUnnecessaryExpences2 = onlyExpencesMonth2.filter(
        (tr) => !tr.isNecesary
      );
      return [
        {
          name: "Type",
          data1: format(currentMonth1InDate, "MM/yyyy"),
          data2: format(currentMonth2InDate, "MM/yyyy"),
          data3: "Difference",
        },
        {
          name: "Necessary",
          data1: calculateTotal(onlyNecessaryExpences1, "expence"),
          data2: calculateTotal(onlyNecessaryExpences2, "expence"),
          data3:
            calculateTotal(onlyNecessaryExpences1, "expence") -
            calculateTotal(onlyNecessaryExpences2, "expence"),
        },
        {
          name: "Unnecessary",
          data1: calculateTotal(onlyUnnecessaryExpences1, "expence"),
          data2: calculateTotal(onlyUnnecessaryExpences2, "expence"),
          data3:
            calculateTotal(onlyUnnecessaryExpences1, "expence") -
            calculateTotal(onlyUnnecessaryExpences2, "expence"),
        },
        {
          name: "Total",
          data1: calculateTotal(onlyExpencesMonth1, "expence"),
          data2: calculateTotal(onlyExpencesMonth2, "expence"),
          data3:
            calculateTotal(onlyExpencesMonth1, "expence") -
            calculateTotal(onlyExpencesMonth2, "expence"),
        },
      ];
    } else {
      return [];
    }
  }, [transactionsMonth1, transactionsMonth2]);

  const data = React.useMemo(
    () => [{ title: "Necessary/Unnecessary compare", data: dataToShow }],
    [dataToShow]
  );

  return <DisplayData data={data} field3 field4 />;
};
