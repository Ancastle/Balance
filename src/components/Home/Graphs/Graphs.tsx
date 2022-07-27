import * as React from "react";
import { ScrollView, Center, Select, CheckIcon } from "native-base";

// Contexts
import { CategoriesContext, PreferencesContext } from "../../Contexts";

// Components
import { CategoriesLineChart } from "./CategoriesLineChart";
import { MonthsPieChart } from "./MonthsPieChart";
import { MonthsLineChart } from "./MonthsLineChart";

// Utils
import { LANGUAGES, pastMonths } from "../../statics";
import { getLastMonths } from "../../utils";
import { MonthsNumbers } from "./MonthNumbers";
import { CategoriesNumbers } from "./CategoriesNumbers";

// Store
import { selectTransactionsData } from "../../../app/transactionsSlice";
import { useAppSelector } from "../../../app/hooks";

const Graphs: React.FC = () => {
  const transactions = useAppSelector(selectTransactionsData);
  const { categories } = React.useContext(CategoriesContext);
  const { appLanguage } = React.useContext(PreferencesContext);
  const [transactionType, setTransacctionType] = React.useState("");
  const [monthOrCategory, setMonthOrCategory] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [periodRange, setPeriodRange] = React.useState("");
  const [typeOfAnalysis, setTypeOfAnalysis] = React.useState("");
  const [selectedMonth, setSelectedMonth] = React.useState("");

  const selectedCategories = React.useMemo(
    () => categories.filter((cat) => cat.type === transactionType),
    [transactionType]
  );

  const selectedCategory = React.useMemo(
    () => categories.find((cat) => cat.id === categoryId),
    [categoryId]
  );

  const chartOptions = React.useMemo(() => {
    const options = [
      { label: LANGUAGES.lineChart[appLanguage], value: "lineChart" },
      { label: LANGUAGES.plainNumbers[appLanguage], value: "plainNumbers" },
    ];
    if (monthOrCategory === "byMonth") {
      options.push({
        label: LANGUAGES.pieChart[appLanguage],
        value: "pieChart",
      });
    }
    return options;
  }, [monthOrCategory]);

  const lastMonths = React.useMemo(() => {
    const date = new Date();
    return getLastMonths(
      date.getMonth(),
      appLanguage,
      parseInt(periodRange, 10)
    );
  }, [periodRange]);

  const fullSelectedMonth = React.useMemo(() => {
    return lastMonths.find((i) => i.name === selectedMonth);
  }, [lastMonths, selectedMonth]);

  return (
    <Center>
      <ScrollView
        maxW="400"
        h="80"
        _contentContainerStyle={{
          px: "10px",
          mb: "4",
          minW: "72",
          minH: 100,
        }}
      >
        <Select
          top={1}
          selectedValue={transactionType}
          minWidth="380"
          placeholder={LANGUAGES.selectTransactionType[appLanguage]}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={3}
          onValueChange={(itemValue) => setTransacctionType(itemValue)}
        >
          <Select.Item
            key={0}
            label={LANGUAGES.expenceWord[appLanguage]}
            value="expence"
          />
          <Select.Item
            key={1}
            label={LANGUAGES.entryWord[appLanguage]}
            value="entry"
          />
        </Select>
        {!!transactionType && (
          <Select
            selectedValue={monthOrCategory}
            minWidth="200"
            placeholder={LANGUAGES.graphWord[appLanguage]}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={3}
            onValueChange={(itemValue) => setMonthOrCategory(itemValue)}
          >
            <Select.Item
              key={0}
              label={LANGUAGES.byCategory[appLanguage]}
              value="byCategory"
            />
            <Select.Item
              key={1}
              label={LANGUAGES.byMonth[appLanguage]}
              value="byMonth"
            />
          </Select>
        )}

        {monthOrCategory === "byCategory" && (
          <Select
            selectedValue={categoryId}
            minWidth="200"
            placeholder={LANGUAGES.selectCategory[appLanguage]}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={3}
            onValueChange={(itemValue) => setCategoryId(itemValue)}
          >
            {selectedCategories.map((cat, i) => (
              <Select.Item key={i} label={cat.name} value={cat.id.toString()} />
            ))}
          </Select>
        )}
        {((monthOrCategory === "byCategory" && !!categoryId) ||
          monthOrCategory === "byMonth") && (
          <Select
            selectedValue={periodRange}
            minWidth="200"
            placeholder={LANGUAGES.selectARange[appLanguage]}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={3}
            onValueChange={(itemValue) => setPeriodRange(itemValue)}
          >
            {pastMonths.map((item, i) => (
              <Select.Item
                key={i}
                label={LANGUAGES.lastMonths[appLanguage](item)}
                value={item}
              />
            ))}
          </Select>
        )}
        {!!periodRange && (
          <Select
            selectedValue={typeOfAnalysis}
            minWidth="200"
            placeholder={LANGUAGES.graphType[appLanguage]}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={3}
            onValueChange={(itemValue) => setTypeOfAnalysis(itemValue)}
          >
            {chartOptions.map((item, i) => (
              <Select.Item key={i} label={item.label} value={item.value} />
            ))}
          </Select>
        )}
        {typeOfAnalysis === "pieChart" && (
          <Select
            selectedValue={selectedMonth}
            minWidth="200"
            placeholder={LANGUAGES.selectMonth[appLanguage]}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={3}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          >
            {lastMonths.map((item, i) => (
              <Select.Item key={i} label={item.name} value={item.name} />
            ))}
          </Select>
        )}
        {monthOrCategory === "byCategory" && typeOfAnalysis === "lineChart" && (
          <CategoriesLineChart
            transactions={transactions}
            transactionType={transactionType}
            categoryId={categoryId}
            lastMonths={lastMonths}
          />
        )}
        {monthOrCategory === "byMonth" &&
          typeOfAnalysis === "pieChart" &&
          !!selectedMonth && (
            <MonthsPieChart
              transactions={transactions}
              transactionType={transactionType}
              selectedMonth={fullSelectedMonth}
              selectedCategories={selectedCategories}
            />
          )}
        {monthOrCategory === "byMonth" && typeOfAnalysis === "lineChart" && (
          <MonthsLineChart
            transactions={transactions}
            transactionType={transactionType}
            lastMonths={lastMonths}
            selectedCategories={selectedCategories}
          />
        )}
        {monthOrCategory === "byMonth" && typeOfAnalysis === "plainNumbers" && (
          <MonthsNumbers
            transactions={transactions}
            transactionType={transactionType}
            lastMonths={lastMonths}
            selectedCategories={selectedCategories}
          />
        )}
        {monthOrCategory === "byCategory" &&
          typeOfAnalysis === "plainNumbers" &&
          selectedCategory && (
            <CategoriesNumbers
              transactions={transactions}
              lastMonths={lastMonths}
              category={selectedCategory}
            />
          )}
      </ScrollView>
    </Center>
  );
};

export default Graphs;
