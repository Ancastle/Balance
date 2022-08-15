import * as React from "react";
import { Text, Box, Flex, Center, Heading } from "native-base";
import { Dimensions, SectionList, Pressable } from "react-native";
import { LineChart, StackedBarChart } from "react-native-chart-kit";

// Types
import {
  CategoryType,
  monthIdentifier,
  Transaction,
  monthData,
} from "../../types";

// Components
import CategoryTransactionsMonth from "./CategoryTransactionsMonth";

// Utils
import { LANGUAGES } from "../../statics";
import { isEven, makeCurrencyFormat } from "../../utils";

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../../store";

interface CategoriesNumbersProps {
  transactions: Transaction[];
  lastMonths: monthIdentifier[];
  category: CategoryType;
}

export const CategoriesNumbers: React.FC<CategoriesNumbersProps> = ({
  transactions,
  lastMonths,
  category,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const [showTransactions, setShowTransactions] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState<
    monthData | undefined
  >();

  // const categoryTransactions = React.useMemo(
  //   () =>
  //     transactions.filter(
  //       (trans) =>
  //         trans.categoryId === category.id &&
  //         trans.day.month === currentMonth?.index &&
  //         trans.day.year === currentMonth.year
  //     ),
  //   [currentMonth, category]
  // );

  // const categoryValue = React.useMemo(
  //   () =>
  //     categoryTransactions.reduce((accumulator, object) => {
  //       return accumulator + parseInt(object.value, 10);
  //     }, 0),
  //   [categoryTransactions]
  // );

  // const showingTotals = React.useMemo(
  //   () =>
  //     lastMonths.map((item) => ({
  //       name: item.name,
  //       year: item.year,
  //       type: category.type,
  //       index: item.index,
  //       transactions: transactions.filter(
  //         (trans) =>
  //           trans.id === category.id &&
  //           trans.day.month === item.index &&
  //           trans.day.year === item.year
  //       ),
  //       value: transactions
  //         .filter(
  //           (trans) =>
  //             trans.categoryId === category.id &&
  //             trans.day.month === item.index &&
  //             trans.day.year === item.year
  //         )
  //         .reduce((accumulator, object) => {
  //           return accumulator + parseInt(object.value, 10);
  //         }, 0),
  //     })),
  //   [lastMonths]
  // );

  // const data = React.useMemo(
  //   () => [
  //     {
  //       title: LANGUAGES.numbersByCategory[appLanguage](
  //         category.type,
  //         category.name
  //       ),
  //       data: showingTotals,
  //     },
  //   ],
  //   [showingTotals]
  // );

  return (
    <>
      {/* <SectionList
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
                  setShowTransactions(true);
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
        <CategoryTransactionsMonth
          isOpen={showTransactions}
          onClose={() => setShowTransactions(false)}
          currentMonth={currentMonth}
          currentCategory={{
            name: category.name,
            value: categoryValue,
            transactions: categoryTransactions,
          }}
        />
      )} */}
    </>
  );
};
