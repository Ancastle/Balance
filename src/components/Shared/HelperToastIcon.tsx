import * as React from "react";
import {
  Container,
  Heading,
  Text,
  View,
  Pressable,
  useToast,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

interface HelperToastIconProps {
  onPress: () => void;
}

const HelperToastIcon: React.FC<HelperToastIconProps> = ({ onPress }) => {
  return (
    <Icon
      onPress={onPress}
      ml={3}
      as={<MaterialIcons name="help" />}
      size={5}
      mt={0.5}
      color="primary.500"
    />
  );
};

export default HelperToastIcon;
