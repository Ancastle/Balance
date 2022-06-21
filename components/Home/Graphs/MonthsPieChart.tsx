import * as React from "react";
import { Text } from "native-base";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

// Contexts
import { PreferencesContext } from "../../Contexts";

// Types
import { CategoryType, Transaction } from "../../types";

// Utils
import { LANGUAGES } from "../../statics";
import { getLastMonths } from "../../utils";

interface MonthsPieChartProps {
  transactions: Transaction[];
  transactionType: string;
  categoryId: string;
  selectedMonth: string;
  selectedCategories: CategoryType[];
}

export const MonthsPieChart: React.FC<MonthsPieChartProps> = ({
  transactions,
  selectedCategories,
  transactionType,
  categoryId,
  selectedMonth,
}) => {
  const { appLanguage } = React.useContext(PreferencesContext);

  const random_rgba = () => {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      r().toFixed(1) +
      ")"
    );
  };

  const selectedMonthNumber = React.useMemo(() => {
    return (
      LANGUAGES.months[appLanguage].findIndex(
        (item) => item === selectedMonth
      ) + 1
    );
  }, [selectedMonth]);
  const date = new Date();
  const thisYearOrPast = date.getFullYear() || date.getFullYear() - 1;

  const data = React.useMemo(() => {
    return selectedCategories.map((item, i) => ({
      name: item.name,
      color: random_rgba(),
      legendFontColor: "#7F7F7F",
      legendFontSize: 10,
      value: transactions
        .filter(
          (trans) =>
            trans.categoryId === item.id &&
            trans.day.month === selectedMonthNumber &&
            trans.day.year === thisYearOrPast
        )
        .reduce((accumulator, object) => {
          return accumulator + parseInt(object.value, 10);
        }, 0),
    }));
  }, [selectedMonth, selectedCategories]);

  return (
    <>
      <Text>
        {LANGUAGES.lineChartTitle[appLanguage](transactionType, categoryId)}
      </Text>
      <PieChart
        data={data}
        width={430}
        height={320}
        accessor={"value"}
        backgroundColor={"transparent"}
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: "#08130D",
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
          useShadowColorFromDataset: false, // optional
        }}
        center={[20, 30]}
        paddingLeft={"0"}
        absolute
      />
    </>
  );
};
