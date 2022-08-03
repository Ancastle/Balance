import * as React from "react";
import { Text } from "native-base";
import { Dimensions } from "react-native";
import { LineChart, StackedBarChart } from "react-native-chart-kit";

// Types
import { CategoryType, monthIdentifier, Transaction } from "../../types";

// Utils
import { LANGUAGES } from "../../statics";
import { random_rgba } from "../../utils";

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../../store";

interface MonthsLineChartProps {
  transactions: Transaction[];
  transactionType: string;
  selectedCategories: CategoryType[];
  lastMonths: monthIdentifier[];
}

export const MonthsLineChart: React.FC<MonthsLineChartProps> = ({
  transactions,
  transactionType,
  selectedCategories,
  lastMonths,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const data = React.useMemo(() => {
    return {
      labels: lastMonths.map((i) => i.name),
      legend: selectedCategories.map((i) => i.name),
      barColors: selectedCategories.map((i) => random_rgba()),
      data: lastMonths.map((item) =>
        selectedCategories.map((cat) =>
          transactions
            .filter(
              (trans) =>
                trans.categoryId === cat.id &&
                trans.day.month === item.index &&
                trans.day.year === item.year
            )
            .reduce((accumulator, object) => {
              return accumulator + parseInt(object.value, 10);
            }, 0)
        )
      ),
    };
  }, [lastMonths]);

  return (
    <>
      <Text>{LANGUAGES.monthLineChartTitle[appLanguage](transactionType)}</Text>
      <StackedBarChart
        data={data}
        width={Dimensions.get("window").width - 20} // from react-native
        height={380}
        decimalPlaces={0}
        chartConfig={{
          backgroundGradientFrom: "#2596be",
          backgroundGradientTo: "#2596be",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 1,
          },
          propsForLabels: { strokeWidth: 2 },
          propsForDots: {
            r: "2",
            strokeWidth: "1",
            stroke: "#76b5c5",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 2,
        }}
        hideLegend={false}
      />
    </>
  );
};
