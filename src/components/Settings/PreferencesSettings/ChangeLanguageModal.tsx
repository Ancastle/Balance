import React from "react";
import { Button, Modal, Box, Select, CheckIcon } from "native-base";

// Utils
import { LANGUAGES, ALL_LANGUAGES } from "../../statics";

// Store
import {
  adjustCategoryNames,
  selectPreferencesLanguage,
  useAppSelector,
  useAppDispatch,
  changeLanguage,
  addHistoryRegister,
} from "../../../store";

interface ManageCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeLanguageModal: React.FC<ManageCategoriesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const onAdjustCategoryNames = React.useCallback(
    (appLanguage: number, newLanguage: number) => {
      dispatch(adjustCategoryNames(appLanguage, newLanguage));
    },
    [dispatch, adjustCategoryNames]
  );

  const onChangeLanguage = React.useCallback(
    (newLanguageId: string) => {
      dispatch(changeLanguage(newLanguageId));
    },
    [dispatch, changeLanguage]
  );

  const appLanguage = useAppSelector(selectPreferencesLanguage);

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
            {ALL_LANGUAGES.map((language, i) => (
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
                  onAdjustCategoryNames(
                    appLanguage,
                    parseInt(selectedLanguage, 10)
                  );
                  onChangeLanguage(selectedLanguage);
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
