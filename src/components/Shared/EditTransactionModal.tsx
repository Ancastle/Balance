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
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

//Contexts
import { CategoriesContext, PreferencesContext } from "../Contexts";

//Types
import { Transaction, TransactionType } from "../types";

// Utils
import { LANGUAGES } from "../statics";
import { makeDoubleDigit } from "../utils";

// Store
import { selectCategoriesData } from "../../app/categoriesSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

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
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategoriesData);
  const { appLanguage } = React.useContext(PreferencesContext);

  const [categoryId, setCategoryId] = React.useState("");
  const [name, setName] = React.useState("");
  const [value, setValue] = React.useState("");

  const handleSubmit = React.useCallback(() => {
    const editedTransaction = {
      ...transaction,
      name: name,
      value: value,
      categoryId: categoryId,
    };
    onEdit(editedTransaction);
    onClose();
  }, [transaction, name, value, categoryId]);

  const isSaveDisabled = React.useMemo(
    () =>
      !name ||
      !value ||
      !categoryId ||
      (name === transaction.name &&
        value === transaction.value &&
        categoryId === transaction.categoryId),
    [name, value, categoryId, transaction]
  );

  const showingCategories = React.useMemo(
    () => categories.filter((category) => category.type === type),
    [categories]
  );

  React.useEffect(() => {
    setCategoryId(transaction.categoryId);
    setName(transaction.name);
    setValue(transaction.value);
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
              value={value}
              onChangeText={(text) => setValue(text)}
            />
          </FormControl>
          <Select
            selectedValue={categoryId}
            minWidth="200"
            placeholder={LANGUAGES.selectCategory[appLanguage]}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={3}
            onValueChange={(itemValue) => setCategoryId(itemValue)}
          >
            {showingCategories.map((category, i) => (
              <Select.Item
                key={i}
                label={category.name}
                value={category.id.toString()}
              />
            ))}
          </Select>
        </Modal.Body>
        <Text ml={5} mb={4}>
          {`${LANGUAGES.date[appLanguage]} (dd/mm): ${makeDoubleDigit(
            transaction.day.day
          )}/${makeDoubleDigit(transaction.day.month)} \n${
            LANGUAGES.hour[appLanguage]
          } : ${makeDoubleDigit(transaction.hour.hour)}:${makeDoubleDigit(
            transaction.hour.minutes
          )}`}
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
