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

// Components
// import ReviewTransactionModal from "./EditTransactionModal";

// Contexts
import { CreditCardContext, PreferencesContext } from "../../Contexts";

// Types
import { Transaction, TransactionType } from "../../types";

// Utils
import { makeDoubleDigit, makeCurrencyFormat, isEven } from "../../utils";
import { LANGUAGES } from "../../statics";

const CreditCardTransactionsList: React.FC = () => {
  const { ccTransactions, totalDebt } = React.useContext(CreditCardContext);
  const { appLanguage } = React.useContext(PreferencesContext);

  const TYPE = "expence";

  const [showViewModal, setShowViewModal] = React.useState(false);
  const [transaction, setTransaction] = React.useState<Transaction>();

  const showingTransactions = React.useMemo(
    () => ccTransactions.filter((transaction) => transaction.type === TYPE),
    [ccTransactions, TYPE]
  );

  const data = React.useMemo(
    () => [
      {
        title: `${
          LANGUAGES.expence.tabs.creditCard.debt[appLanguage]
        }: ${makeCurrencyFormat(totalDebt)}`,
        data: showingTransactions,
      },
    ],
    [showingTransactions]
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
            bg={isEven(index) ? "primary.500" : "primary.300"}
          >
            {
              <Pressable
                onPress={() => {
                  setTransaction(item);
                  setShowViewModal(true);
                }}
              >
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
      {/* {!!transaction && (
        <ReviewTransactionModal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          transaction={transaction}
          type={type}
        />
      )} */}
    </>
  );
};

export default CreditCardTransactionsList;
