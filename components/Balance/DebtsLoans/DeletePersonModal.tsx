import React from "react";
import { Button, Modal, Select, CheckIcon, Text } from "native-base";

// Contexts
import { PreferencesContext } from "../../Contexts";

// Types
import { Person } from "../../types";

// Utils
import { LANGUAGES } from "../../statics";

interface DeletePersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (name: string) => void;
  people: Person[];
}

const DeletePersonModal: React.FC<DeletePersonModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  people,
}) => {
  const { appLanguage } = React.useContext(PreferencesContext);

  const [personName, setPersonName] = React.useState("");
  const [personValue, setPersonValue] = React.useState(0);

  const resetModal = React.useCallback(() => {
    setPersonName("");
  }, []);

  React.useEffect(
    () =>
      setPersonValue(
        parseInt(
          people.find((person) => person.name === personName)?.value || "0",
          10
        )
      ),
    [personName]
  );

  const handleSave = React.useCallback(() => {
    onDelete(personName);
    resetModal();
    onClose();
  }, [personName]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {LANGUAGES.balance.tabs.debtsLoans.deletingPerson[appLanguage]}
        </Modal.Header>
        <Modal.Body>
          <Select
            selectedValue={personName}
            minWidth="200"
            placeholder={
              LANGUAGES.balance.tabs.debtsLoans.selectAPerson[appLanguage]
            }
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={3}
            onValueChange={(itemValue) => setPersonName(itemValue)}
          >
            {people.map((person, i) => (
              <Select.Item key={i} label={person.name} value={person.name} />
            ))}
          </Select>
          {!!personValue && (
            <Text bold>
              {LANGUAGES.balance.tabs.debtsLoans.valueError[appLanguage]}
            </Text>
          )}
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
            <Button
              onPress={handleSave}
              colorScheme="secondary"
              isDisabled={!personName || personValue !== 0}
            >
              {LANGUAGES.delete[appLanguage]}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default DeletePersonModal;
