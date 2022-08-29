import * as React from "react";
import { ScrollView, Center } from "native-base";
import { sub } from "date-fns";

// Components
import {
  TransactionTypeFilter,
  AnalysisTypeFilter,
  SortingTypeFilter,
  CategorySelect,
  MonthSelect,
} from "./AnalysisSettings";

// Utils
import { LANGUAGES } from "../../statics";
import { MonthsNumbers } from "./MonthNumbers";
import { CategoriesNumbers } from "./CategoriesNumbers";

// Store
import {
  selectCategoriesData,
  selectTransactionsData,
  selectPreferencesLanguage,
  useAppSelector,
} from "../../../store";

const Graphs: React.FC = () => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  const categories = useAppSelector(selectCategoriesData);
  const transactions = useAppSelector(selectTransactionsData);

  const [type, setType] = React.useState("expence");
  const [analysisType, setAnalysisType] = React.useState("monthly");
  const [sorting, setSorting] = React.useState("necessary");
  const [selectedCategory, setSelectedCategory] = React.useState("allCats");
  const [selectedMonth, setSelectedMonth] = React.useState("currentMonth");
  const [monthFrom, setMonthFrom] = React.useState("5");
  const [monthTo, setMonthTo] = React.useState("currentMonth");

  const currentDate: Date = React.useMemo(() => new Date(), [transactions]);

  const lastSixMonths = React.useMemo(
    () => [...Array(6)].map((item, i) => sub(currentDate, { months: i + 1 })),
    [currentDate]
  );

  React.useEffect(() => {
    if (type === "entry") {
      setSorting("byCategory");
    }
  }, [type]);

  React.useEffect(() => {
    if (analysisType === "compare") {
      setMonthFrom("currentMonth");
      setMonthTo("0");
    }
  }, [analysisType]);

  return (
    <Center>
      <ScrollView
        h="400"
        _contentContainerStyle={{
          mb: "4",
          minW: "72",
          minH: 100,
        }}
      >
        <TransactionTypeFilter
          type={type}
          setType={(nextType) => {
            setType(nextType);
          }}
        />
        <AnalysisTypeFilter
          analysisType={analysisType}
          setAnalysisType={(nextAnalysisType) => {
            setAnalysisType(nextAnalysisType);
          }}
        />
        <SortingTypeFilter
          sortingType={sorting}
          setSortingType={(nextSortingType) => setSorting(nextSortingType)}
          isDisabled={type === "entry"}
        />
        {sorting === "byCategory" && (
          <CategorySelect
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={(nextCategory) =>
              setSelectedCategory(nextCategory)
            }
            type={type}
          />
        )}
        {analysisType === "monthly" && (
          <MonthSelect
            title={LANGUAGES.analysis.monthSelect.singleMonthTitle[appLanguage]}
            month={selectedMonth}
            setMonth={(nextMonth) => setSelectedMonth(nextMonth)}
            currentDate={currentDate}
            lastSixMonths={lastSixMonths}
          />
        )}
        {["fromTo", "compare"].includes(analysisType) && (
          <MonthSelect
            title={LANGUAGES.analysis.monthSelect.monthFromTitle[appLanguage]}
            month={monthFrom}
            setMonth={(nextMonthFrom) => setMonthFrom(nextMonthFrom)}
            currentDate={currentDate}
            lastSixMonths={lastSixMonths}
          />
        )}
        {["fromTo", "compare"].includes(analysisType) && (
          <MonthSelect
            title={LANGUAGES.analysis.monthSelect.monthToTitle[appLanguage]}
            month={monthTo}
            setMonth={(nextMonthTo) => setMonthTo(nextMonthTo)}
            currentDate={currentDate}
            lastSixMonths={lastSixMonths}
          />
        )}
      </ScrollView>
    </Center>
  );
};

export default Graphs;
