import * as React from "react";
import { Text } from "native-base";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

// Contexts
import { PreferencesContext } from "../../Contexts";

// Types
import { Transaction } from "../../types";

// Utils
import { LANGUAGES } from "../../statics";
import { getLastMonths } from "../../utils";

interface CategoriesLineChartProps {
  transactions: Transaction[];
  transactionType: string;
  categoryId: string;
  lastMonths: string[];
}

export const CategoriesLineChart: React.FC<CategoriesLineChartProps> = ({
  transactions,
  transactionType,
  categoryId,
  lastMonths,
}) => {
  const { appLanguage } = React.useContext(PreferencesContext);

  const labels = React.useMemo(() => {
    return lastMonths.map((item) => item.substring(0, 3).toUpperCase());
  }, [lastMonths]);

  const data = React.useMemo(() => {
    const date = new Date();
    const thisYearOrPast = date.getFullYear() || date.getFullYear() - 1;
    const monthsNumbers = lastMonths.map(
      (item) =>
        LANGUAGES.months[appLanguage].findIndex((month) => month === item) + 1
    );
    return monthsNumbers.map((item) =>
      transactions
        .filter(
          (i) =>
            i.categoryId.toString() === categoryId &&
            i.day.month === item &&
            i.day.year === thisYearOrPast
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
          labels: labels,
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
