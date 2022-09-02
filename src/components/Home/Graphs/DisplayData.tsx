import * as React from "react";
import {
  Text,
  Box,
  Flex,
  Center,
  Heading,
  SectionList,
  Pressable,
} from "native-base";

// Utils
import { isEven, makeCurrencyFormat } from "../../utils";

import { titleStyles } from "../../styles";

interface DisplayDataProps {
  data: any;
  field3?: boolean;
  field4?: boolean;
  onPressItem: (item: any) => void;
}

export const DisplayData: React.FC<DisplayDataProps> = ({
  data,
  field3 = false,
  field4 = false,
  onPressItem,
}) => {
  return (
    <SectionList
      minW={380}
      sections={data}
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item, index }) => (
        <Box
          key={index}
          minW="64"
          bg={isEven(index) ? "primary.500" : "primary.300"}
        >
          {
            <Pressable
              onPress={() => {
                if (item.transactions) {
                  onPressItem(item);
                }
              }}
            >
              <Flex direction="row" py={1.5}>
                <Center flex={2.5}>
                  <Box flex={1.5}>{item.name}</Box>
                </Center>
                <Center flex={2.5}>
                  <Text numberOfLines={1}>
                    {typeof item.data1 === "number"
                      ? makeCurrencyFormat(Math.abs(item.data1))
                      : item.data1}
                  </Text>
                </Center>
                {field3 && (
                  <Center flex={2.5}>
                    <Text numberOfLines={1}>
                      {typeof item.data2 === "number"
                        ? makeCurrencyFormat(Math.abs(item.data2))
                        : item.data2}
                    </Text>
                  </Center>
                )}
                {field4 && (
                  <Center flex={2.5}>
                    <Text numberOfLines={1}>
                      {typeof item.data3 === "number"
                        ? makeCurrencyFormat(Math.abs(item.data3))
                        : item.data3}
                    </Text>
                  </Center>
                )}
              </Flex>
            </Pressable>
          }
        </Box>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Center>
          <Heading
            fontSize={titleStyles.fontSize}
            fontWeight={titleStyles.fontWeight}
            mt="3"
            pb="4"
          >
            {title}
          </Heading>
        </Center>
      )}
    />
  );
};
