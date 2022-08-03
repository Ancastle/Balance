import * as React from "react";
import { Text } from "native-base";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

// Types
import { CategoryType, monthIdentifier, Transaction } from "../../types";

// Utils
import { LANGUAGES } from "../../statics";
import { random_rgba } from "../../utils";

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../../store";

interface MonthsPieChartProps {
  transactions: Transaction[];
  transactionType: string;
  selectedMonth?: monthIdentifier;
  selectedCategories: CategoryType[];
}

export const MonthsPieChart: React.FC<MonthsPieChartProps> = ({
  transactions,
  selectedCategories,
  transactionType,
  selectedMonth,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

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
            trans.day.month === selectedMonth?.index &&
            trans.day.year === selectedMonth?.year
        )
        .reduce((accumulator, object) => {
          return accumulator + parseInt(object.value, 10);
        }, 0),
    }));
  }, [selectedMonth, selectedCategories]);

  return (
    <>
      <Text>{LANGUAGES.pieChartTitle[appLanguage](transactionType)}</Text>
      <PieChart
        data={data}
        width={Dimensions.get("window").width - 15}
        height={320}
        accessor={"value"}
        backgroundColor={"none"}
        chartConfig={{
          backgroundGradientFrom: "#2596be",
          backgroundGradientTo: "#2596be",
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
