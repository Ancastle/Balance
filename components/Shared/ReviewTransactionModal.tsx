import React from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Icon,
  Select,
  CheckIcon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

//Contexts
import { TransactionsContext } from "../Contexts/TransactionsContextProvider";
import { CategoriesContext } from "../Contexts/CategoriesContextProvider";
import { PreferencesContext } from "../Contexts/PreferencesContextProvider";

//Types
import { Transaction, TransactionType } from "../types";

// Utils
import { LANGUAGES } from "../statics";

interface ReviewTransactionModalProps {
  isOpen: boolean;
  transaction: Transaction;
  type: TransactionType;
  onClose: () => void;
}

const ReviewTransactionModal: React.FC<ReviewTransactionModalProps> = ({
  isOpen,
  onClose,
  type,
  transaction,
}) => {
  const { editTransaction } = React.useContext(TransactionsContext);
  const { categories } = React.useContext(CategoriesContext);
  const { preferences } = React.useContext(PreferencesContext);
  const appLanguage = React.useMemo(
    () => preferences.appLanguage,
    [preferences]
  );

  const [isEditing, setIsEditing] = React.useState(false);
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
    editTransaction(editedTransaction);
    onClose();
  }, [transaction, name, value, categoryId]);

  const isSaveEnabled = React.useMemo(
    () =>
      !!name &&
      !!value &&
      !!categoryId &&
      (name !== transaction.name ||
        value !== transaction.value ||
        categoryId !== transaction.categoryId),
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
        <Modal.Header>
          {isEditing
            ? LANGUAGES.editingTransaction[appLanguage]
            : LANGUAGES.reviewingTransaction[appLanguage]}
        </Modal.Header>
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
              isDisabled={!isEditing}
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
              isDisabled={!isEditing}
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
            isDisabled={!isEditing}
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
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setIsEditing(false);
                onClose();
              }}
            >
              {LANGUAGES.cancel[appLanguage]}
            </Button>
            <Button
              onPress={() => {
                isEditing ? handleSubmit() : setIsEditing(true);
              }}
              isDisabled={isEditing ? !isSaveEnabled : false}
            >
              {isEditing
                ? LANGUAGES.save[appLanguage]
                : LANGUAGES.edit[appLanguage]}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ReviewTransactionModal;
