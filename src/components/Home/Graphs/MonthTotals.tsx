import * as React from "react";
import { isSameMonth, parseISO, format } from "date-fns";

// Components
import { DisplayData } from "./DisplayData";
import TransactionsDisplayModal from "./TransactionsDisplayModal";

// Utils
import { calculateTotal } from "../../utils";
import { LANGUAGES } from "../../statics";

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
  lastThreeMonths: Date[];
  sorting: string;
}

export const MonthTotals: React.FC<MonthTotalsProps> = ({
  transactionType,
  selectedMonth,
  lastThreeMonths,
  sorting,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  const categories = useAppSelector(selectCategoriesData);
  const transactions = useAppSelector(selectTransactionsData);

  const [selectedMonthOrCat, setSelectedMonthOrCat] = React.useState<any>("");

  const currentMonthInDate = React.useMemo(
    () =>
      selectedMonth === "currentMonth"
        ? new Date()
        : lastThreeMonths[parseInt(selectedMonth, 10)],
    [selectedMonth, lastThreeMonths]
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
    const transactionsByCategory = typeCategoriesOnly.map((cat) => {
      const currentCategoryTransactions = transactionsCurrentMonth.filter(
        (tr) => tr.categoryId === cat.id && tr.type === transactionType
      );
      return {
        name: cat.name,
        data1: calculateTotal(currentCategoryTransactions, transactionType),
        transactions: currentCategoryTransactions,
      };
    });
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
          name: LANGUAGES.type[appLanguage],
          data1: `${format(currentMonthInDate, "MM/yyyy")}`,
          transactions: null,
        },
        {
          name: LANGUAGES.necessaary[appLanguage],
          data1: calculateTotal(
            currentMonthData.onlyNecessaryExpences,
            "expence"
          ),
          transactions: currentMonthData.onlyNecessaryExpences,
        },
        {
          name: LANGUAGES.unnecessaary[appLanguage],
          data1: calculateTotal(
            currentMonthData.onlyUnnecessaryExpences,
            "expence"
          ),
          transactions: currentMonthData.onlyUnnecessaryExpences,
        },
        {
          name: LANGUAGES.total[appLanguage],
          data1: calculateTotal(currentMonthData.onlyExpences, "expence"),
          transactions: currentMonthData.onlyExpences,
        },
      ];
    } else {
      return [
        {
          name: LANGUAGES.category[appLanguage],
          data1: `${format(currentMonthInDate, "MM/yyyy")}`,
          transactions: null,
        },
        ...currentMonthData.transactionsByCategory,
        {
          name: LANGUAGES.total[appLanguage],
          data1: currentMonthData.transactionsByCategory.reduce(
            (acc, cat) => acc + cat.data1,
            0
          ),
          transactions: transactionsCurrentMonth.filter(
            (tr) => tr.type === transactionType
          ),
        },
      ];
    }
  }, [transactionsCurrentMonth, sorting, transactionType]);

  const title = React.useMemo(
    () =>
      sorting === "necessary"
        ? `${LANGUAGES.necessaary[appLanguage]}/${LANGUAGES.unnecessaary[appLanguage]}`
        : LANGUAGES.byCategories[appLanguage],
    [dataToShow, sorting]
  );

  const data = React.useMemo(
    () => [{ title: title, data: dataToShow }],
    [dataToShow, title]
  );

  const modalTitle: string = React.useMemo(() => {
    if (!!selectedMonthOrCat) {
      if (selectedMonthOrCat.name === LANGUAGES.total[appLanguage]) {
        return transactionType === "expence"
          ? `${LANGUAGES.allExpencesFrom[appLanguage]} ${format(
              currentMonthInDate,
              "MM/yyyy"
            )}`
          : `${LANGUAGES.allEntriesFrom[appLanguage]} ${format(
              currentMonthInDate,
              "MM/yyyy"
            )}`;
      } else {
        return transactionType === "expence"
          ? `'${selectedMonthOrCat.name}' ${
              LANGUAGES.expencesFrom[appLanguage]
            } ${format(currentMonthInDate, "MM/yyyy")}`
          : `'${selectedMonthOrCat.name}' ${
              LANGUAGES.entriesFrom[appLanguage]
            } ${format(currentMonthInDate, "MM/yyyy")}`;
      }
    } else {
      return "";
    }
  }, [selectedMonthOrCat]);

  return (
    <>
      <DisplayData
        data={data}
        onPressItem={(item: any) => setSelectedMonthOrCat(item)}
      />
      {!!selectedMonthOrCat && (
        <TransactionsDisplayModal
          data={selectedMonthOrCat.transactions}
          isOpen={!!selectedMonthOrCat}
          title={modalTitle}
          onClose={() => setSelectedMonthOrCat(null)}
        />
      )}
    </>
  );
};
