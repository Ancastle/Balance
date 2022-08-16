import React from "react";
import { SectionList, Heading, Center, Flex, Box, Text } from "native-base";
import parseISO from "date-fns/parseISO";

// Utils
import { makeDoubleDigit, isEven } from "../../utils";

// Statics
import { LANGUAGES } from "../../statics";

// Store
import {
  selectPreferencesLanguage,
  selectHistoryData,
  useAppSelector,
} from "../../../store";

const History: React.FC = () => {
  const history = useAppSelector(selectHistoryData);
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const data = React.useMemo(
    () => [
      {
        title: LANGUAGES.history[appLanguage],
        data: history,
      },
    ],
    [history]
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
            <Flex direction="row" py={1.5}>
              <Box flex={1}>{` ${makeDoubleDigit(
                parseISO(item.date).getDate()
              )}/${makeDoubleDigit(parseISO(item.date).getMonth())}`}</Box>
              <Box flex={1}>{` ${makeDoubleDigit(
                parseISO(item.date).getHours()
              )}:${makeDoubleDigit(parseISO(item.date).getMinutes())}`}</Box>
              <Center flex={6}>
                <Text numberOfLines={1}>{item.name}</Text>
              </Center>
            </Flex>
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
    </>
  );
};

export default History;
