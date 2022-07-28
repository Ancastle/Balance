import React from "react";
import { Button, Modal, FormControl, Input, Icon, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

// Types
import { Person } from "../../types";

// Utils
import { LANGUAGES } from "../../statics";

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../../store";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
  people: Person[];
}

const AddPersonModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  people,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const [name, setName] = React.useState("");

  const resetModal = React.useCallback(() => {
    setName("");
  }, []);

  const handleSave = React.useCallback(() => {
    onAdd(name);
    resetModal();
    onClose();
  }, [name]);

  const isNameTaken = React.useMemo(
    () => people.some((person) => person.name === name),
    [name, people]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {LANGUAGES.balance.tabs.debtsLoans.addingPerson[appLanguage]}
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
              value={name}
              onChangeText={(text) => setName(text)}
            />
            {isNameTaken && (
              <Text bold>
                {LANGUAGES.balance.tabs.debtsLoans.nameTaken[appLanguage]}
              </Text>
            )}
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                resetModal();
                onClose();
              }}
            >
              {LANGUAGES.cancel[appLanguage]}
            </Button>
            <Button onPress={handleSave} isDisabled={!name || isNameTaken}>
              {LANGUAGES.save[appLanguage]}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AddPersonModal;
