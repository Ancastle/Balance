import * as React from "react";
import { Text } from "native-base";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

// Contexts
import { PreferencesContext } from "../../Contexts";

// Types
import { monthIdentifier, Transaction } from "../../types";

// Utils
import { LANGUAGES } from "../../statics";
import { getLastMonths } from "../../utils";

interface CategoriesLineChartProps {
  transactions: Transaction[];
  transactionType: string;
  categoryId: string;
  lastMonths: monthIdentifier[];
}

export const CategoriesLineChart: React.FC<CategoriesLineChartProps> = ({
  transactions,
  transactionType,
  categoryId,
  lastMonths,
}) => {
  const { appLanguage } = React.useContext(PreferencesContext);

  const data = React.useMemo(() => {
    return lastMonths.map((item) =>
      transactions
        .filter(
          (i) =>
            i.categoryId.toString() === categoryId &&
            i.day.month === item.index &&
            i.day.year === item.year
        )
        .reduce((accumulator, object) => {
          return accumulator + parseInt(object.value, 10);
        }, 0)
    );
  }, [lastMonths]);

  return (
    <>
      <Text>
        {LANGUAGES.lineChartTitle[appLanguage](transactionType, categoryId)}
      </Text>
      <LineChart
        data={{
          labels: lastMonths.map((i) => i.name),
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={Dimensions.get("window").width - 15} // from react-native
        height={400}
        fromZero={true}
        yAxisLabel="$ "
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(37, 150, 190, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 1,
          },
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
      />
    </>
  );
};
