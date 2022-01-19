//Externals
import React from "react";
import { Text, Icon, HStack, Center, Pressable } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

//Utils
import LANGUAGES from "../languages";

interface FooterProps {
  currentSection: number;
  onChangeSection: (selectedSection: number) => void;
}
//TBD: MAKE DINAMIC
const appLanguage = 1;

const Footer: React.FC<FooterProps> = ({ currentSection, onChangeSection }) => (
  <HStack bg="primary.900" alignItems="center" safeAreaBottom shadow={6}>
    <Pressable
      opacity={currentSection === 0 ? 1 : 0.5}
      py="3"
      flex={1}
      onPress={() => onChangeSection(0)}
    >
      <Center>
        <Icon
          mb="1"
          as={
            <MaterialCommunityIcons
              name={currentSection === 0 ? "home" : "home-outline"}
            />
          }
          color="white"
          size="sm"
        />
        <Text color="white" fontSize="12">
          {LANGUAGES.footer.home[appLanguage]}
        </Text>
      </Center>
    </Pressable>
    <Pressable
      opacity={currentSection === 1 ? 1 : 0.5}
      py="2"
      flex={1}
      onPress={() => onChangeSection(1)}
    >
      <Center>
        <Icon
          mb="1"
          as={<MaterialIcons name="money-off" />}
          color="white"
          size="sm"
        />
        <Text color="white" fontSize="12">
          {LANGUAGES.footer.expences[appLanguage]}
        </Text>
      </Center>
    </Pressable>
    <Pressable
      opacity={currentSection === 2 ? 1 : 0.6}
      py="2"
      flex={1}
      onPress={() => onChangeSection(2)}
    >
      <Center>
        <Icon
          mb={1}
          as={<MaterialIcons name="attach-money" />}
          color="white"
          size="sm"
        />
        <Text color="white" fontSize={12}>
          {LANGUAGES.footer.entries[appLanguage]}
        </Text>
      </Center>
    </Pressable>
    <Pressable
      opacity={currentSection === 3 ? 1 : 0.5}
      py="2"
      flex={1}
      onPress={() => onChangeSection(3)}
    >
      <Center>
        <Icon
          mb={1}
          as={<MaterialIcons name="account-balance" />}
          color="white"
          size="sm"
        />
        <Text color="white" fontSize="12">
          {LANGUAGES.footer.balance[appLanguage]}
        </Text>
      </Center>
    </Pressable>
    <Pressable
      opacity={currentSection === 4 ? 1 : 0.5}
      py="2"
      flex={1}
      onPress={() => onChangeSection(4)}
    >
      <Center>
        <Icon
          mb={1}
          as={<MaterialIcons name="settings" />}
          color="white"
          size="sm"
        />
        <Text color="white" fontSize="12">
          {LANGUAGES.footer.settings[appLanguage]}
        </Text>
      </Center>
    </Pressable>
  </HStack>
);

export default Footer;
