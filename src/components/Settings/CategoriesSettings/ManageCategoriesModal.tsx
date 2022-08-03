import React from "react";
import { Button, Modal, Text, Box } from "native-base";

// Components
import CategoryInputModal from "./CategoryInputModal";
import Category from "./Category";

// Types
import { CategoryType, TransactionType, UuId } from "../../types";

// Utils
import { isEven } from "../../utils";
import { LANGUAGES } from "../../statics";

// Store
import {
  selectCategoriesData,
  addCategory,
  editCategory,
  deleteCategory,
  selectPreferencesLanguage,
  useAppSelector,
  useAppDispatch,
  addHistoryRegister,
} from "../../../store";

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
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategoriesData);

  const onAdd = React.useCallback(
    (categoryName: string, categoryType: TransactionType) => {
      dispatch(addCategory(categoryName, categoryType));
      dispatch(
        addHistoryRegister(LANGUAGES.createCategory[appLanguage], categoryName)
      );
    },
    [dispatch, addCategory, addHistoryRegister]
  );
  const onEdit = React.useCallback(
    (categoryNewName: string, categoryId: UuId) => {
      dispatch(editCategory(categoryNewName, categoryId));
      dispatch(
        addHistoryRegister(LANGUAGES.editCategory[appLanguage], categoryNewName)
      );
    },
    [dispatch, editCategory]
  );
  const onDelete = React.useCallback(
    (categoryId: UuId, categoryName: string) => {
      dispatch(deleteCategory(categoryId));
      dispatch(
        addHistoryRegister(LANGUAGES.deleteCategory[appLanguage], categoryName)
      );
    },
    [dispatch, deleteCategory]
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
                onDelete={onDelete}
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
              onAdd(newCategoryName, type);
            }}
          />
          <CategoryInputModal
            isOpen={!!editingCategory}
            onClose={() => setEditingCategory(undefined)}
            category={editingCategory}
            onSave={(newCategoryName) => {
              if (editingCategory) {
                onEdit(newCategoryName, editingCategory.id);
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
