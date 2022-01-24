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

//Types
import { Transaction, TransactionType } from "../types";

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
  }, [transaction, name, value, categoryId]);

  const isSaveEnabled = React.useMemo(
    () => !!name && !!value && !!categoryId,
    [name, value, categoryId]
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
          {`${isEditing ? "Editando" : "Viendo"} ${
            type === "expence" ? "egreso" : "ingreso"
          }`}
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
              placeholder="Nombre"
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
              placeholder="Valor"
              isDisabled={!isEditing}
              value={value}
              onChangeText={(text) => setValue(text)}
            />
          </FormControl>
          <Select
            selectedValue={categoryId}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Elige una categoria"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={3}
            onValueChange={(itemValue) => setCategoryId(itemValue)}
            isDisabled={!isEditing}
          >
            {categories.map((category, i) => (
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
              Cancelar
            </Button>
            <Button
              onPress={() => {
                isEditing ? handleSubmit() : setIsEditing(true);
              }}
              isDisabled={isEditing ? !isSaveEnabled : false}
            >
              {isEditing ? "Guardar" : "Editar"}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ReviewTransactionModal;
