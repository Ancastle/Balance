import React from "react";
import { Button, Modal, Box, Select, CheckIcon } from "native-base";

// Contexts
import { CategoriesContext, PreferencesContext } from "../../Contexts";

// Utils
import { LANGUAGES } from "../../statics";

interface ManageCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeLanguageModal: React.FC<ManageCategoriesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { adjustCategoryNames } = React.useContext(CategoriesContext);
  const { appLanguage, languages, changeLanguage } =
    React.useContext(PreferencesContext);

  const [selectedLanguage, setSelectedLanguage] = React.useState("");

  const isSaveDisabled = React.useMemo(
    () => appLanguage === parseInt(selectedLanguage, 10),
    [appLanguage, selectedLanguage]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {
            LANGUAGES.settings.tabs.preferences.changeLanguageModalTitle[
              appLanguage
            ]
          }
        </Modal.Header>
        <Modal.Body>
          <Select
            selectedValue={selectedLanguage}
            minWidth="200"
            placeholder={
              LANGUAGES.settings.tabs.preferences.changeLanguagePlaceholder[
                appLanguage
              ]
            }
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={3}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          >
            {languages.map((language, i) => (
              <Select.Item
                key={i}
                label={language.name}
                value={language.id.toString()}
              />
            ))}
          </Select>
        </Modal.Body>
        <Modal.Footer>
          <Box>
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
              <Button
                onPress={() => {
                  adjustCategoryNames(
                    appLanguage,
                    parseInt(selectedLanguage, 10)
                  );
                  changeLanguage(selectedLanguage);
                  onClose();
                }}
                isDisabled={isSaveDisabled}
              >
                {LANGUAGES.save[appLanguage]}
              </Button>
            </Button.Group>
          </Box>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ChangeLanguageModal;
