import React from "react";
import { Fab, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";

interface FabComponentProps {
  onClick: () => void;
}

const FabComponent: React.FC<FabComponentProps> = ({ onClick }) => {
  return (
    <Fab
      position="absolute"
      onPress={onClick}
      top={665}
      right={4}
      size="70"
      icon={<Icon color="white" as={<AntDesign name="plus" />} size="md" />}
    />
  );
};

export default FabComponent;
