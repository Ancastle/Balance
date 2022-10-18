import * as React from "react";
import { parseISO, isSameMonth, format } from "date-fns";

// Components
import { DisplayData } from "./DisplayData";

// Utils
import { calculateTotal } from "../../utils";
import { LANGUAGES } from "../../statics";

// Store
import {
  selectPreferencesLanguage,
  selectTransactionsData,
  selectCategoriesData,
  useAppSelector,
} from "../../../store";

interface CompareTotalsProps {
  transactionType: string;
  month1: string;
  month2: string;
  lastThreeMonths: Date[];
  sorting: string;
}

export const CompareTotals: React.FC<CompareTotalsProps> = ({
  transactionType,
  month1,
  month2,
  lastThreeMonths,
  sorting,
}) => {
  const categories = useAppSelector(selectCategoriesData);
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  const transactions = useAppSelector(selectTransactionsData);

  const currentMonth1InDate = React.useMemo(
    () =>
      month1 === "currentMonth"
        ? new Date()
        : lastThreeMonths[parseInt(month1, 10)],
    [month1, lastThreeMonths]
  );

  const currentMonth2InDate = React.useMemo(
    () =>
      month2 === "currentMonth"
        ? new Date()
        : lastThreeMonths[parseInt(month2, 10)],
    [month2, lastThreeMonths]
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

  const typeCategoriesOnly = React.useMemo(
    () => categories.filter((cat) => cat.type === transactionType),
    [transactionType]
  );

  const month1Data = React.useMemo(() => {
    const onlyExpencesMonth1 = transactionsMonth1.filter(
      (tr) => tr.type === "expence"
    );
    const onlyNecessaryExpences1 = onlyExpencesMonth1.filter(
      (tr) => tr.isNecesary
    );
    const onlyUnnecessaryExpences1 = onlyExpencesMonth1.filter(
      (tr) => !tr.isNecesary
    );

    return {
      onlyExpencesMonth1,
      onlyNecessaryExpences1,
      onlyUnnecessaryExpences1,
    };
  }, [transactionsMonth1]);

  const month2Data = React.useMemo(() => {
    const onlyExpencesMonth2 = transactionsMonth2.filter(
      (tr) => tr.type === "expence"
    );

    const onlyNecessaryExpences2 = onlyExpencesMonth2.filter(
      (tr) => tr.isNecesary
    );
    const onlyUnnecessaryExpences2 = onlyExpencesMonth2.filter(
      (tr) => !tr.isNecesary
    );

    return {
      onlyExpencesMonth2,
      onlyNecessaryExpences2,
      onlyUnnecessaryExpences2,
    };
  }, [transactionsMonth2]);

  const categoriesNormalizedData = React.useMemo(
    () =>
      typeCategoriesOnly.map((cat) => ({
        name: cat.name,
        data1: calculateTotal(
          transactionsMonth1.filter((tr) => tr.categoryId === cat.id),
          transactionType
        ),
        data2: calculateTotal(
          transactionsMonth2.filter((tr) => tr.categoryId === cat.id),
          transactionType
        ),
        data3:
          calculateTotal(
            transactionsMonth1.filter((tr) => tr.categoryId === cat.id),
            transactionType
          ) -
          calculateTotal(
            transactionsMonth2.filter((tr) => tr.categoryId === cat.id),
            transactionType
          ),
      })),
    [transactionsMonth1, transactionsMonth2, sorting, transactionType]
  );

  const dataToShow = React.useMemo(() => {
    if (transactionType === "expence" && sorting === "necessary") {
      return [
        {
          name: LANGUAGES.type[appLanguage],
          data1: format(currentMonth1InDate, "MM/yyyy"),
          data2: format(currentMonth2InDate, "MM/yyyy"),
          data3: LANGUAGES.difference[appLanguage],
        },
        {
          name: LANGUAGES.necessaary[appLanguage],
          data1: calculateTotal(month1Data.onlyNecessaryExpences1, "expence"),
          data2: calculateTotal(month2Data.onlyNecessaryExpences2, "expence"),
          data3:
            calculateTotal(month1Data.onlyNecessaryExpences1, "expence") -
            calculateTotal(month2Data.onlyNecessaryExpences2, "expence"),
        },
        {
          name: LANGUAGES.unnecessaary[appLanguage],
          data1: calculateTotal(month1Data.onlyUnnecessaryExpences1, "expence"),
          data2: calculateTotal(month2Data.onlyUnnecessaryExpences2, "expence"),
          data3:
            calculateTotal(month1Data.onlyUnnecessaryExpences1, "expence") -
            calculateTotal(month2Data.onlyUnnecessaryExpences2, "expence"),
        },
        {
          name: LANGUAGES.total[appLanguage],
          data1: calculateTotal(month1Data.onlyExpencesMonth1, "expence"),
          data2: calculateTotal(month2Data.onlyExpencesMonth2, "expence"),
          data3:
            calculateTotal(month1Data.onlyExpencesMonth1, "expence") -
            calculateTotal(month2Data.onlyExpencesMonth2, "expence"),
        },
      ];
    } else {
      return [
        {
          name: LANGUAGES.category[appLanguage],
          data1: format(currentMonth1InDate, "MM/yyyy"),
          data2: format(currentMonth2InDate, "MM/yyyy"),
          data3: LANGUAGES.difference[appLanguage],
        },
        ...categoriesNormalizedData,
        {
          name: LANGUAGES.total[appLanguage],
          data1: categoriesNormalizedData.reduce(
            (acc, cat) => acc + cat.data1,
            0
          ),
          data2: categoriesNormalizedData.reduce(
            (acc, cat) => acc + cat.data2,
            0
          ),
          data3:
            categoriesNormalizedData.reduce((acc, cat) => acc + cat.data1, 0) -
            categoriesNormalizedData.reduce((acc, cat) => acc + cat.data2, 0),
        },
      ];
    }
  }, [transactionsMonth1, transactionsMonth2, sorting, transactionType]);

  const title = React.useMemo(
    () =>
      sorting === "necessary"
        ? `${LANGUAGES.necessaary[appLanguage]}/${LANGUAGES.unnecessaary[appLanguage]}`
        : LANGUAGES.byCategories[appLanguage],
    [dataToShow, sorting]
  );

  const data = React.useMemo(
    () => [{ title: title, data: dataToShow }],
    [dataToShow]
  );

  return (
    <DisplayData
      data={data}
      field3
      field4
      onPressItem={() => {
        /* no Op*/
      }}
    />
  );
};
