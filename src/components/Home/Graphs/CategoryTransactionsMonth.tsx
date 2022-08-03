import React from "react";
import { Button, Modal, Text, Box, Flex, Center, VStack } from "native-base";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../../store";

interface CategoryTransactionsMonthProps {
  isOpen: boolean;
  onClose: () => void;
  currentMonth: monthData;
  currentCategory: categoryData;
}

const CategoryTransactionsMonth: React.FC<CategoryTransactionsMonthProps> = ({
  isOpen,
  onClose,
  currentMonth,
  currentCategory,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const data = React.useMemo(
    () =>
      currentCategory.transactions.map((c) => ({
        name: c.name,
        value: c.value,
      })),
    [currentMonth, currentCategory]
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {LANGUAGES.currentCategoryCurrentMonthTitle[appLanguage](
            currentMonth.name,
            currentCategory.name
          )}
        </Modal.Header>
        <Modal.Body>
          <VStack space={1} alignItems="center">
            {data.map((item, index) => (
              <Box
                key={index}
                minW="64"
                bg={isEven(index) ? "primary.500" : "primary.300"}
              >
                <Flex direction="row" py={1.5}>
                  <Box flex={1.5}>{` ${item.name}`}</Box>
                  <Center flex={2.5}>
                    <Text numberOfLines={1}>
                      {makeCurrencyFormat(parseInt(item.value, 10))}
                    </Text>
                  </Center>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Modal.Body>
        <Text ml={5} mb={4}>
          {`Total: ${makeCurrencyFormat(currentCategory.value)}`}
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
  );
};

export default CategoryTransactionsMonth;
