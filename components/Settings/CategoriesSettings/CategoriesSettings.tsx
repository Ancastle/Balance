import * as React from "react";
import {
  Center,
  SectionList,
  Heading,
  Pressable,
  Flex,
  Box,
  Text,
} from "native-base";

// Components
import ManageCategoriesModal from "./ManageCategoriesModal";

// Types
import { TransactionType } from "../../types";

// Utils
import { isEven } from "../../utils";
import { LANGUAGES } from "../../statics";

//TBD: MAKE DINAMIC
const appLanguage = 1;

const CategoriesSettings: React.FC = () => {
  const [type, setType] = React.useState<TransactionType>();
  const [showEditModal, setShowEditModal] = React.useState(false);

  const data = React.useMemo(
    () => [
      {
        title: LANGUAGES.settings.tabs.categories.label[appLanguage],
        data: [
          {
            name: LANGUAGES.settings.tabs.categories.manageExpences[
              appLanguage
            ],
            type: "expence",
          },
          {
            name: LANGUAGES.settings.tabs.categories.manageEntries[appLanguage],
            type: "entry",
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <SectionList
        mb="4"
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <Box
            key={index}
            minW="64"
            bg={isEven(index) ? "primary.500" : "primary.300"}
          >
            {
              <Pressable
                py={1.5}
                onPress={() => {
                  setType(item.type);
                  setShowEditModal(true);
                }}
              >
                <Flex direction="row" py={1.5}>
                  <Center flex={1}>
                    <Text>{item.name}</Text>
                  </Center>
                </Flex>
              </Pressable>
            }
          </Box>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Center>
            <Heading fontSize="xl" mt="3" pb="4">
              {title}
            </Heading>
          </Center>
        )}
      />
      {!!type && (
        <ManageCategoriesModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          type={type}
        />
      )}
    </>
  );
};

export default CategoriesSettings;
