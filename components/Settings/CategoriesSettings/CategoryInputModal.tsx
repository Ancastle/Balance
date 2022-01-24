import React from "react";
import { Button, Modal, FormControl, Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

// Contexts
import { CategoriesContext } from "../../Contexts/CategoriesContextProvider";
import { PreferencesContext } from "../../Contexts/PreferencesContextProvider";

// Types
import { CategoryType } from "../../types";
import { LANGUAGES } from "../../statics";

interface CategoryInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newCategoryName: string) => void;
  category?: CategoryType;
}

const CategoryInputModal: React.FC<CategoryInputModalProps> = ({
  isOpen,
  onClose,
  onSave,
  category,
}) => {
  const { preferences } = React.useContext(PreferencesContext);
  const appLanguage = React.useMemo(
    () => preferences.appLanguage,
    [preferences]
  );

  const { categories } = React.useContext(CategoriesContext);

  const [newCategoryName, setNewCategoryName] = React.useState("");

  const isSaveDisabled = React.useMemo(
    () =>
      categories.some((category) => category.name === newCategoryName) ||
      newCategoryName === "",
    [newCategoryName, categories]
  );

  React.useEffect(() => {
    if (category) {
      setNewCategoryName(category.name);
    }
  }, [category]);

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {!!category
            ? LANGUAGES.settings.tabs.categories.editCategory[appLanguage]
            : LANGUAGES.settings.tabs.categories.addCategory[appLanguage]}
        </Modal.Header>
        <Modal.Body>
          <FormControl isInvalid={isSaveDisabled}>
            <Input
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="description" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder={
                LANGUAGES.settings.tabs.categories.categoryName[appLanguage]
              }
              value={newCategoryName}
              onChangeText={(text) => setNewCategoryName(text)}
            />
            <FormControl.ErrorMessage>
              {newCategoryName === ""
                ? LANGUAGES.settings.tabs.categories.categoryNameEmpty[
                    appLanguage
                  ]
                : LANGUAGES.settings.tabs.categories.categoryNameExists[
                    appLanguage
                  ]}
            </FormControl.ErrorMessage>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                onClose();
                setNewCategoryName("");
              }}
            >
              {LANGUAGES.cancel[appLanguage]}
            </Button>
            <Button
              onPress={() => {
                onSave(newCategoryName);
                setNewCategoryName("");
                onClose();
              }}
              isDisabled={isSaveDisabled}
            >
              {LANGUAGES.save[appLanguage]}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CategoryInputModal;
