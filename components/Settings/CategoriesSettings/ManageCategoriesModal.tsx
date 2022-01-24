import React from "react";
import { Button, Modal, Text, Box } from "native-base";

// Components
import CategoryInputModal from "./CategoryInputModal";
import Category from "./Category";

// Contexts
import { CategoriesContext } from "../../Contexts/CategoriesContextProvider";
import { PreferencesContext } from "../../Contexts/PreferencesContextProvider";

// Types
import { CategoryType, TransactionType } from "../../types";

// Utils
import { isEven } from "../../utils";
import { LANGUAGES } from "../../statics";

interface ManageCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: TransactionType;
  mode: string;
}

const ManageCategoriesModal: React.FC<ManageCategoriesModalProps> = ({
  isOpen,
  onClose,
  type,
  mode,
}) => {
  const { categories, addCategory, editCategory, deleteCategory } =
    React.useContext(CategoriesContext);
  const { preferences } = React.useContext(PreferencesContext);
  const appLanguage = React.useMemo(
    () => preferences.appLanguage,
    [preferences]
  );

  const [editingCategory, setEditingCategory] = React.useState<CategoryType>();
  const [isAdding, setIsAdding] = React.useState(false);

  const showingCategories = React.useMemo(
    () => categories.filter((category) => category.type === type),
    [categories, type]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {type === "entry"
            ? LANGUAGES.settings.tabs.categories.entryCategories[appLanguage]
            : LANGUAGES.settings.tabs.categories.expenceCategories[appLanguage]}
        </Modal.Header>
        <Modal.Body>
          {showingCategories.map((category, index) => {
            return (
              <Category
                onDelete={(categoryId) => {
                  deleteCategory(categoryId);
                }}
                mode={mode}
                color={isEven(index) ? "primary.500" : "primary.300"}
                key={index}
                category={category}
                onEdit={() => {
                  setEditingCategory(category);
                }}
              />
            );
          })}
          <CategoryInputModal
            isOpen={isAdding}
            onClose={() => setIsAdding(false)}
            onSave={(newCategoryName) => {
              addCategory(newCategoryName, type);
            }}
          />
          <CategoryInputModal
            isOpen={!!editingCategory}
            onClose={() => setEditingCategory(undefined)}
            category={editingCategory}
            onSave={async (newCategoryName) => {
              if (editingCategory) {
                editCategory(newCategoryName, editingCategory.id);
              }
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Box marginBottom={1}>
            {mode === "edit" && (
              <Text fontSize="xs">
                {type === "entry"
                  ? LANGUAGES.settings.tabs.categories.entryNote[appLanguage]
                  : LANGUAGES.settings.tabs.categories.expencesNote[
                      appLanguage
                    ]}
              </Text>
            )}
          </Box>
          <Box>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  onClose();
                }}
              >
                Ok
              </Button>
              {mode === "add" ? (
                <Button
                  onPress={() => {
                    setIsAdding(true);
                  }}
                >
                  {LANGUAGES.add[appLanguage]}
                </Button>
              ) : (
                <></>
              )}
            </Button.Group>
          </Box>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ManageCategoriesModal;
