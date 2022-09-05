import * as React from "react";
import { Container, Center, useToast, Box } from "native-base";
import { sub } from "date-fns";

// Components
import {
  TransactionTypeFilter,
  AnalysisTypeFilter,
  SortingTypeFilter,
  MonthSelect,
} from "./AnalysisSettings";
import { FromToTotals } from "./FromToTotals";
import { CompareTotals } from "./CompareTotals";

// Utils
import { LANGUAGES } from "../../statics";
import { MonthTotals } from "./MonthTotals";

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../../store";
import HelperToastIcon from "../../Shared/HelperToastIcon";

const Graphs: React.FC = () => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const toast = useToast();

  const [type, setType] = React.useState("expence");
  const [analysisType, setAnalysisType] = React.useState("monthly");
  const [sorting, setSorting] = React.useState("necessary");
  const [selectedMonth, setSelectedMonth] = React.useState("currentMonth");
  const [monthFrom, setMonthFrom] = React.useState("5");
  const [monthTo, setMonthTo] = React.useState("currentMonth");

  const currentDate: Date = React.useMemo(() => new Date(), []);

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
      setMonthFrom("5");
      setMonthTo("currentMonth");
    }
  }, [analysisType]);

  React.useEffect(() => {
    const compareMonthFrom = monthFrom === "currentMonth" ? "-1" : monthFrom;
    const compareMonthTo = monthTo === "currentMonth" ? "-1" : monthTo;
    if (
      analysisType === "fromTo" &&
      (compareMonthFrom === compareMonthTo ||
        compareMonthFrom === "-1" ||
        compareMonthFrom < compareMonthTo)
    ) {
      setMonthTo("currentMonth");
      setMonthFrom("5");
      toast.show({
        description: LANGUAGES.helpers.analysisFromTo[appLanguage],
        placement: "top",
        duration: 4000,
      });
    }
  }, [monthFrom, monthTo, analysisType]);

  return (
    <Container h="610" mb="4" ml={"2"}>
      <HelperToastIcon
        styles={{ position: "absolute", left: 330, top: 14 }}
        onPress={() => {
          if (!toast.isActive("homeScreenHelper")) {
            toast.show({
              id: "homeScreenHelper",
              description: LANGUAGES.helpers.analysisScreen[appLanguage],
              placement: "top",
              duration: 5000,
            });
          }
        }}
      />
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
          title={
            analysisType === "compare"
              ? LANGUAGES.analysis.monthSelect.compare[appLanguage]
              : LANGUAGES.analysis.monthSelect.monthFromTitle[appLanguage]
          }
          month={monthFrom}
          setMonth={(nextMonthFrom) => setMonthFrom(nextMonthFrom)}
          currentDate={currentDate}
          lastSixMonths={lastSixMonths}
        />
      )}
      {["fromTo", "compare"].includes(analysisType) && (
        <MonthSelect
          title={
            analysisType === "compare"
              ? LANGUAGES.analysis.monthSelect.withThis[appLanguage]
              : LANGUAGES.analysis.monthSelect.monthToTitle[appLanguage]
          }
          month={monthTo}
          setMonth={(nextMonthTo) => setMonthTo(nextMonthTo)}
          currentDate={currentDate}
          lastSixMonths={lastSixMonths}
        />
      )}
      {analysisType === "monthly" && (
        <MonthTotals
          transactionType={type}
          lastSixMonths={lastSixMonths}
          selectedMonth={selectedMonth}
          sorting={sorting}
        />
      )}
      {analysisType === "fromTo" && (
        <FromToTotals
          transactionType={type}
          lastSixMonths={lastSixMonths}
          monthFrom={monthFrom}
          monthTo={monthTo}
          sorting={sorting}
        />
      )}
      {analysisType === "compare" && (
        <CompareTotals
          transactionType={type}
          lastSixMonths={lastSixMonths}
          month1={monthFrom}
          month2={monthTo}
          sorting={sorting}
        />
      )}
    </Container>
  );
};

export default Graphs;
