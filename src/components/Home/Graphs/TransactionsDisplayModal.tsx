import React from "react";
import {
  Button,
  Modal,
  ScrollView,
  Box,
  Center,
  Pressable,
  Flex,
  Text,
} from "native-base";

import { subtitlesStyles } from "../../styles";

// Utils
import { LANGUAGES } from "../../statics";
import { makeCurrencyFormat, isEven } from "../../utils";

// Store
import { selectPreferencesLanguage, useAppSelector } from "../../../store";

interface TransactionsDisplayModalProps {
  data: any;
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

const TransactionsDisplayModal: React.FC<TransactionsDisplayModalProps> = ({
  data,
  isOpen,
  title,
  onClose,
}) => {
  const appLanguage = useAppSelector(selectPreferencesLanguage);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          <Text
            fontWeight={subtitlesStyles.fontWeight}
            fontSize={subtitlesStyles.fontSize}
          >
            {title}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <ScrollView w={["270"]} h="80">
            {data.map((item: any, index: number) => (
              <Box
                key={index}
                minW={10}
                bg={isEven(index) ? "primary.500" : "primary.300"}
              >
                {
                  <Pressable onPress={() => {}}>
                    <Flex direction="row" py={1.5}>
                      <Center flex={3}>
                        <Box flex={1.5}>{item.name}</Box>
                      </Center>
                      <Center flex={1.5}>
                        <Box flex={1.5}>
                          {makeCurrencyFormat(parseInt(item.value, 10))}
                        </Box>
                      </Center>
                    </Flex>
                  </Pressable>
                }
              </Box>
            ))}
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={1}>
            <Button onPress={onClose}>{LANGUAGES.ok[appLanguage]}</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default TransactionsDisplayModal;
