import React from "react";
import {
  SectionList,
  Heading,
  Center,
  Pressable,
  Flex,
  Box,
  Text,
} from "native-base";
import parseISO from "date-fns/parseISO";

// Utils
import { makeDoubleDigit, makeCurrencyFormat, isEven } from "../../utils";
import { LANGUAGES } from "../../statics";

import { selectPreferencesLanguage, useAppSelector } from "../../../store";

import { Person } from "../../types";

interface BalanceTransactionsListProps {
  person: Person;
}

const PersonHistoryList: React.FC<BalanceTransactionsListProps> = ({
  person,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  const data = React.useMemo(
    () => [
      {
        title: `${LANGUAGES.historyWith[appLanguage]}: ${person.name}`,
        data: person.transactions,
      },
    ],
    [appLanguage, person]
  );

  return (
    <>
      <SectionList
        mb="4"
        sections={data}
        maxHeight={200}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <Box
            key={index}
            minW="64"
            bg={isEven(index) ? "primary.500" : "primary.300"}
          >
            {
              <Pressable>
                <Flex direction="row" py={1.5}>
                  <Box flex={1.5}>
                    {`${makeDoubleDigit(
                      parseISO(item.date).getDate()
                    )}/${makeDoubleDigit(parseISO(item.date).getMonth() + 1)}`}
                  </Box>
                  <Box flex={6} justifyContent="flex-start">
                    <Text numberOfLines={1}> {item.name}</Text>
                  </Box>
                  <Center flex={2.5}>
                    <Text numberOfLines={1}>
                      {makeCurrencyFormat(parseInt(item.value, 10))}
                    </Text>
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
    </>
  );
};

export default PersonHistoryList;
