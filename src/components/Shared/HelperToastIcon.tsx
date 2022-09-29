import * as React from "react";
import { Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

interface HelperToastIconProps {
  onPress: () => void;
  styles?: any;
}

const HelperToastIcon: React.FC<HelperToastIconProps> = ({
  onPress,
  styles,
}) => {
  return (
    <Icon
      style={styles}
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
