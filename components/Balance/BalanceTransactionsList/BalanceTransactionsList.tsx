import React from "react";
import {
  SectionList,
  Heading,
  Center,
  Pressable,
  Flex,
  Box,
  Text,
} from "native-base";

// Contexts
import { TransactionsContext, PreferencesContext } from "../../Contexts";

// Utils
import { makeDoubleDigit, makeCurrencyFormat } from "../../utils";
import { LANGUAGES } from "../../statics";

const BalanceTransactionsList: React.FC = () => {
  const { transactions, totalBalance } = React.useContext(TransactionsContext);
  const { appLanguage } = React.useContext(PreferencesContext);

  const data = React.useMemo(
    () => [
      {
        title: `${
          LANGUAGES.balance.tabs.balance[appLanguage]
        }: ${makeCurrencyFormat(totalBalance)}`,
        data: transactions,
      },
    ],
    [appLanguage, totalBalance, transactions]
  );

  return (
    <>
      <SectionList
        mb="4"
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <Box
            key={index}
            minW="64"
            bg={item.type === "entry" ? "tertiary.300" : "secondary.300"}
          >
            {
              <Pressable>
                <Flex direction="row" py={1.5}>
                  <Box flex={1.5}>{` ${makeDoubleDigit(
                    item.day.day
                  )}/${makeDoubleDigit(item.day.month)}`}</Box>
                  <Box flex={6} justifyContent="flex-start">
                    <Text numberOfLines={1}> {item.name}</Text>
                  </Box>
                  <Center flex={2.5}>
                    <Text numberOfLines={1}>
                      {makeCurrencyFormat(parseInt(item.value, 10))}
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
    </>
  );
};

export default BalanceTransactionsList;
