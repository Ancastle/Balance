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
  Checkbox,
} from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import parseISO from "date-fns/parseISO";

//Types
import { Transaction, TransactionType } from "../types";

// Utils
import { LANGUAGES } from "../statics";
import { makeCurrencyFormat, makeFlatNumber, makeDoubleDigit } from "../utils";

// Store
import {
  selectCategoriesData,
  selectPreferencesLanguage,
  useAppSelector,
} from "../../store";

interface EditTransactionModalProps {
  isOpen: boolean;
  transaction: Transaction;
  type: TransactionType;
  onClose: () => void;
  onEdit: (editingTransaction: Transaction) => void;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
  isOpen,
  onClose,
  type,
  transaction,
  onEdit,
}) => {
  const categories = useAppSelector(selectCategoriesData);
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const [categoryId, setCategoryId] = React.useState("");
  const [name, setName] = React.useState("");
  const [value, setValue] = React.useState("");
  const [displayValue, setDisplayValue] = React.useState("");
  const [necesary, setNecesary] = React.useState(false);

  const handleSubmit = React.useCallback(() => {
    const editedTransaction = {
      ...transaction,
      name: name,
      value: value,
      categoryId: categoryId,
      isNecesary: necesary,
    };
    onEdit(editedTransaction);
    onClose();
  }, [transaction, name, value, categoryId, necesary]);

  const isDebtLoan = React.useMemo(
    () => ["expence1", "entry1"].includes(transaction.categoryId),
    [transaction]
  );

  const isSaveDisabled = React.useMemo(
    () =>
      isDebtLoan ||
      !name ||
      !value ||
      !categoryId ||
      (name === transaction.name &&
        value === transaction.value &&
        categoryId === transaction.categoryId &&
        necesary === transaction.isNecesary),
    [name, value, categoryId, transaction, necesary]
  );

  const showingCategories = React.useMemo(
    () => categories.filter((category) => category.type === type),
    [categories]
  );

  React.useEffect(() => {
    setCategoryId(transaction.categoryId);
    setName(transaction.name);
    setValue(transaction.value);
    setDisplayValue(
      makeCurrencyFormat(makeFlatNumber(transaction.value), true)
    );
    setNecesary(transaction.isNecesary);
  }, [transaction]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{LANGUAGES.editingTransaction[appLanguage]}</Modal.Header>
        <Modal.Body>
          <FormControl>
            <Input
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="description" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder={LANGUAGES.name[appLanguage]}
              value={name}
              onChangeText={(text) => setName(text)}
              isDisabled={isDebtLoan}
            />
          </FormControl>
          <FormControl mt="3">
            <Input
              type="number"
              keyboardType="numeric"
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="attach-money" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder={LANGUAGES.value[appLanguage]}
              value={displayValue}
              onChangeText={(text) => {
                setDisplayValue(makeCurrencyFormat(makeFlatNumber(text), true));
                setValue(makeFlatNumber(text).toString());
              }}
              isDisabled={isDebtLoan}
            />
          </FormControl>
          <Select
            dropdownIcon={
              <MaterialCommunityIcons name="chevron-down" size={20} />
            }
            selectedValue={categoryId}
            minWidth="200"
            placeholder={LANGUAGES.selectCategory[appLanguage]}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={3}
            onValueChange={(itemValue) => setCategoryId(itemValue)}
            isDisabled={isDebtLoan}
          >
            {showingCategories.map((category, i) => (
              <Select.Item
                key={i}
                label={category.name}
                value={category.id.toString()}
              />
            ))}
          </Select>
          {isDebtLoan && (
            <Text>{LANGUAGES.cantEditDebtLoans[appLanguage]}</Text>
          )}
          {type === "expence" && (
            <Checkbox
              value=""
              isChecked={necesary}
              color="green.100"
              onChange={() => setNecesary((prevState) => !prevState)}
              mt={3}
            >
              <Text ml={2}>{LANGUAGES.isThisNecesary[appLanguage]}</Text>
            </Checkbox>
          )}
        </Modal.Body>
        <Text ml={5} mb={4}>
          {`${LANGUAGES.date[appLanguage]} (dd/mm): ${makeDoubleDigit(
            parseISO(transaction.date).getDate()
          )}/${makeDoubleDigit(parseISO(transaction.date).getMonth() + 1)} \n${
            LANGUAGES.hour[appLanguage]
          } : ${makeDoubleDigit(
            parseISO(transaction.date).getHours()
          )}:${makeDoubleDigit(parseISO(transaction.date).getMinutes())}`}
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
            <Button onPress={handleSubmit} isDisabled={isSaveDisabled}>
              {LANGUAGES.save[appLanguage]}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default EditTransactionModal;
