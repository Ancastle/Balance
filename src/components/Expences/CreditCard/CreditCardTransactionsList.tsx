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
import { parseISO, format } from "date-fns";

// Types
import { Transaction } from "../../types";

// Utils
import { makeDoubleDigit, makeCurrencyFormat, isEven } from "../../utils";
import { LANGUAGES } from "../../statics";
import EditTransactionModal from "../../Shared/EditTransactionModal";

// Store
import {
  selectPreferencesLanguage,
  selectCreditCardData,
  selectCreditCardTotal,
  editCreditCardTransaction,
  selectPreferencesDateFormat,
  useAppSelector,
  useAppDispatch,
  addHistoryRegister,
} from "../../../store";

const CreditCardTransactionsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const onEditCreditCardTransaction = React.useCallback(
    (editingTransaction: Transaction) => {
      dispatch(editCreditCardTransaction(editingTransaction));
      dispatch(
        addHistoryRegister(
          LANGUAGES.editCCTransaction[appLanguage],
          editingTransaction.name
        )
      );
    },
    [dispatch, editCreditCardTransaction]
  );

  const creditCardTransactions = useAppSelector(selectCreditCardData);
  const totalDebt = useAppSelector(selectCreditCardTotal);
  const appLanguage = useAppSelector(selectPreferencesLanguage);
  const dateFormat = useAppSelector(selectPreferencesDateFormat);

  const [showViewModal, setShowViewModal] = React.useState(false);
  const [transaction, setTransaction] = React.useState<Transaction>();

  const data = React.useMemo(
    () => [
      {
        title: `${
          LANGUAGES.expence.tabs.creditCard.debt[appLanguage]
        }: ${makeCurrencyFormat(totalDebt)}`,
        data: creditCardTransactions,
      },
    ],
    [creditCardTransactions]
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
                  <Box flex={1.5}>
                    {` ${format(parseISO(item.date), dateFormat)}`}
                  </Box>
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
      {!!transaction && (
        <EditTransactionModal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          transaction={transaction}
          type="expence"
          onEdit={onEditCreditCardTransaction}
        />
      )}
    </>
  );
};

export default CreditCardTransactionsList;
