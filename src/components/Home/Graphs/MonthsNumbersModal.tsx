import React from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Icon,
  Select,
  CheckIcon,
  Text,
  SectionList,
  Box,
  Flex,
  Center,
  Heading,
  VStack,
} from "native-base";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

//Contexts
import { CategoriesContext, PreferencesContext } from "../../Contexts";

//Types
import {
  categoryData,
  CategoryType,
  monthData,
  Transaction,
  TransactionType,
} from "../../types";

// Utils
import { LANGUAGES } from "../../statics";
import { isEven, makeCurrencyFormat } from "../../utils";
import CategoryTransactionsMonth from "./CategoryTransactionsMonth";

interface MonthsNumbersModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMonth: monthData;
  selectedCategories: CategoryType[];
}

const MonthsNumbersModal: React.FC<MonthsNumbersModalProps> = ({
  isOpen,
  onClose,
  currentMonth,
  selectedCategories,
}) => {
  const { appLanguage } = React.useContext(PreferencesContext);
  const [showingTransactions, setShowingTransactions] = React.useState(false);
  const [currentCategory, setCurrentCategory] = React.useState<
    categoryData | undefined
  >();
  const data = React.useMemo(
    () =>
      selectedCategories.map((c) => ({
        name: c.name,
        transactions: currentMonth.transactions.filter(
          (trans) => trans.categoryId === c.id
        ),
        value: currentMonth.transactions
          .filter((trans) => trans.categoryId === c.id)
          .reduce((accumulator, object) => {
            return accumulator + parseInt(object.value, 10);
          }, 0),
      })),
    [currentMonth, selectedCategories]
  );
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            {LANGUAGES.currentMonthModalTitle[appLanguage](currentMonth.name)}
          </Modal.Header>
          <Modal.Body>
            <VStack space={1} alignItems="center">
              {data.map((item, index) => (
                <Box
                  key={index}
                  minW="64"
                  bg={isEven(index) ? "primary.500" : "primary.300"}
                >
                  <Pressable
                    onPress={() => {
                      setCurrentCategory(item);
                      setShowingTransactions(true);
                    }}
                  >
                    <Flex direction="row" py={1.5}>
                      <Box flex={1.5}>{` ${item.name}`}</Box>
                      <Center flex={2.5}>
                        <Text numberOfLines={1}>
                          {makeCurrencyFormat(item.value)}
                        </Text>
                      </Center>
                    </Flex>
                  </Pressable>
                </Box>
              ))}
            </VStack>
          </Modal.Body>
          <Text ml={5} mb={4}>
            {`Total: ${makeCurrencyFormat(currentMonth.value)}`}
          </Text>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  onClose();
                }}
              >
                {LANGUAGES.cancel[appLanguage]}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {!!currentCategory && (
        <CategoryTransactionsMonth
          isOpen={showingTransactions}
          onClose={() => setShowingTransactions(false)}
          currentMonth={currentMonth}
          currentCategory={currentCategory}
        />
      )}
    </>
  );
};

export default MonthsNumbersModal;
