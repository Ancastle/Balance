import React from "react";
import { Box, Pressable, Flex, Center, AlertDialog, Button } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

// Types
import { CategoryType, UuId } from "../../types";
import { LANGUAGES } from "../../statics";

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../../store";

interface CategoryProps {
  color: string;
  category: CategoryType;
  onEdit: () => void;
  onDelete: (categoryId: UuId, categoryName: string) => void;
  mode: string;
}

const Category: React.FC<CategoryProps> = ({
  color,
  category,
  onEdit,
  onDelete,
  mode,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

  const cancelRef = React.useRef(null);

  const handleDelete = React.useCallback(async () => {
    onDelete(category.id, category.name);
    setIsConfirmOpen(false);
  }, [category]);

  const isMain = React.useMemo(
    () =>
      ["expence0", "expence1"].includes(category.id.toString()) ||
      ["entry0", "entry1"].includes(category.id.toString()),
    [category]
  );

  return (
    <Box bg={color} borderRadius={3} marginBottom={1}>
      <AlertDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen((prevState) => !prevState)}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>
            {LANGUAGES.settings.tabs.categories.deleteLabel[appLanguage]}
          </AlertDialog.Header>
          <AlertDialog.Body>
            {`${LANGUAGES.settings.tabs.categories.confirmDelete[appLanguage]} "${category.name}"`}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => {
                  setIsConfirmOpen(false);
                }}
                ref={cancelRef}
              >
                {LANGUAGES.cancel[appLanguage]}
              </Button>
              <Button colorScheme="danger" onPress={handleDelete}>
                {LANGUAGES.delete[appLanguage]}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <Flex direction="row" justifyContent="space-between">
        <Center marginLeft={2}>{category.name}</Center>
        <Center flexDirection="row">
          {mode === "add" ? (
            <Pressable disabled={isMain} padding={1}>
              <MaterialCommunityIcons
                name="delete-forever"
                size={20}
                color="transparent"
              />
            </Pressable>
          ) : (
            <>
              <Pressable
                disabled={isMain}
                onPress={() => {
                  onEdit();
                }}
                padding={1}
              >
                <MaterialIcons
                  name="edit"
                  size={20}
                  color={isMain ? "grey" : "black"}
                />
              </Pressable>
              <Pressable
                disabled={isMain}
                onPress={() => {
                  setIsConfirmOpen(true);
                }}
                padding={1}
              >
                <MaterialCommunityIcons
                  name="delete-forever"
                  size={20}
                  color={isMain ? "grey" : "black"}
                />
              </Pressable>
            </>
          )}
        </Center>
      </Flex>
    </Box>
  );
};

export default Category;
