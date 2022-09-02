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
import TransactionsDisplayModal from "./TransactionsDisplayModal";

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

  const [selectedMonthOrCat, setSelectedMonthOrCat] = React.useState<any>("");

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
    const transactionsByCategory = typeCategoriesOnly.map((cat) => {
      const currentCategoryTransactions = transactionsCurrentPeriod.filter(
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
  }, [transactionsCurrentPeriod, transactionType]);

  const dataToShow = React.useMemo(() => {
    if (transactionType === "expence" && sorting === "necessary") {
      return [
        {
          name: LANGUAGES.type[appLanguage],
          data1: `${format(currentMonthFromInDate, "MM/yyyy")} - ${format(
            currentMonthToInDate,
            "MM/yyyy"
          )}`,
          transactions: null,
        },
        {
          name: LANGUAGES.necessaary[appLanguage],
          data1: calculateTotal(
            currentPeriodData.onlyNecessaryExpences,
            "expence"
          ),
          transactions: currentPeriodData.onlyNecessaryExpences,
        },
        {
          name: LANGUAGES.unnecessaary[appLanguage],
          data1: calculateTotal(
            currentPeriodData.onlyUnnecessaryExpences,
            "expence"
          ),
          transactions: currentPeriodData.onlyUnnecessaryExpences,
        },
        {
          name: LANGUAGES.total[appLanguage],
          data1: calculateTotal(currentPeriodData.onlyExpences, "expence"),
          transactions: currentPeriodData.onlyExpences,
        },
      ];
    } else {
      return [
        {
          name: LANGUAGES.category[appLanguage],
          data1: `${format(currentMonthFromInDate, "MM/yyyy")} - ${format(
            currentMonthToInDate,
            "MM/yyyy"
          )}`,
          transactions: null,
        },
        ...currentPeriodData.transactionsByCategory,
        {
          name: LANGUAGES.total[appLanguage],
          data1: currentPeriodData.transactionsByCategory.reduce(
            (acc, cat) => acc + cat.data1,
            0
          ),
          transactions: transactionsCurrentPeriod.filter(
            (tr) => tr.type === transactionType
          ),
        },
      ];
    }
  }, [transactionsCurrentPeriod, transactionType, sorting]);

  const modalTitle: string = React.useMemo(() => {
    if (!!selectedMonthOrCat) {
      if (selectedMonthOrCat.name === LANGUAGES.total[appLanguage]) {
        return transactionType === "expence"
          ? `${LANGUAGES.allExpencesFromTo[appLanguage]} ${format(
              currentMonthFromInDate,
              "MM/yyyy"
            )} ${LANGUAGES.to[appLanguage]} ${format(
              currentMonthToInDate,
              "MM/yyyy"
            )}`
          : `${LANGUAGES.allEntriesFromTo[appLanguage]} ${format(
              currentMonthFromInDate,
              "MM/yyyy"
            )} ${LANGUAGES.to[appLanguage]} ${format(
              currentMonthToInDate,
              "MM/yyyy"
            )}`;
      } else {
        return transactionType === "expence"
          ? `'${selectedMonthOrCat.name}' ${
              LANGUAGES.expencesFromTo[appLanguage]
            } ${format(currentMonthFromInDate, "MM/yyyy")} ${
              LANGUAGES.to[appLanguage]
            } ${format(currentMonthToInDate, "MM/yyyy")}`
          : `'${selectedMonthOrCat.name}' ${
              LANGUAGES.entriesFromTo[appLanguage]
            } ${format(currentMonthFromInDate, "MM/yyyy")} ${
              LANGUAGES.to[appLanguage]
            } ${format(currentMonthToInDate, "MM/yyyy")}`;
      }
    } else {
      return "";
    }
  }, [selectedMonthOrCat]);

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
