import * as React from "react";
import { Text, Box, Flex, Center, Heading } from "native-base";
import { Dimensions, SectionList, Pressable } from "react-native";
import { LineChart, StackedBarChart } from "react-native-chart-kit";

// Contexts
import { PreferencesContext } from "../../Contexts";

// Types
import {
  CategoryType,
  monthData,
  monthIdentifier,
  Transaction,
} from "../../types";

// Components
import MonthNumbersModal from "./MonthsNumbersModal";

// Utils
import { LANGUAGES } from "../../statics";
import { random_rgba, isEven, makeCurrencyFormat } from "../../utils";
import { margin } from "styled-system";

interface MonthsNumbersProps {
  transactions: Transaction[];
  transactionType: string;
  lastMonths: monthIdentifier[];
  selectedCategories: CategoryType[];
}

export const MonthsNumbers: React.FC<MonthsNumbersProps> = ({
  transactions,
  transactionType,
  lastMonths,
  selectedCategories,
}) => {
  const { appLanguage } = React.useContext(PreferencesContext);
  const [showCategories, setShowCategories] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState<
    monthData | undefined
  >();

  const showingTotals = React.useMemo(
    () =>
      lastMonths.map((item, i) => ({
        name: item.name,
        year: item.year,
        type: transactionType,
        transactions: transactions.filter(
          (trans) =>
            trans.type === transactionType &&
            trans.day.month === item.index &&
            trans.day.year === item.year
        ),
        value: transactions
          .filter(
            (trans) =>
              trans.type === transactionType &&
              trans.day.month === item.index &&
              trans.day.year === item.year
          )
          .reduce((accumulator, object) => {
            return accumulator + parseInt(object.value, 10);
          }, 0),
      })),
    [lastMonths]
  );

  const data = React.useMemo(
    () => [
      {
        title: LANGUAGES.numbersByMonth[appLanguage](transactionType),
        data: showingTotals,
      },
    ],
    [showingTotals]
  );

  return (
    <>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item, index }) => (
          <Box
            key={index}
            minW="64"
            bg={isEven(index) ? "primary.500" : "primary.300"}
          >
            {
              <Pressable
                onPress={() => {
                  setCurrentMonth(item);
                  setShowCategories(true);
                }}
              >
                <Flex direction="row" py={1.5}>
                  <Box flex={1.5}>{` ${item.name} ${item.year}`}</Box>
                  <Center flex={2.5}>
                    <Text numberOfLines={1}>
                      {makeCurrencyFormat(item.value)}
                    </Text>
                  </Center>
                </Flex>
              </Pressable>
            }
          </Box>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Center>
            <Heading fontSize="xl" mt="3" pb="4">
              {title}
            </Heading>
          </Center>
        )}
      />
      {!!currentMonth && (
        <MonthNumbersModal
          isOpen={showCategories}
          onClose={() => setShowCategories(false)}
          currentMonth={currentMonth}
          selectedCategories={selectedCategories}
        />
      )}
    </>
  );
};
