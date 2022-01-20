import * as React from "react";
import { Dimensions, StatusBar, Animated, Pressable } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { Box } from "native-base";

// Types
import { Tab } from "../types";

interface TabsHeaderProps {
  tabs: Tab[];
  onTabChange: (tab: number) => void;
  firstRoute: React.ReactElement;
  secondRoute: React.ReactElement;
}

const TabsHeader: React.FC<TabsHeaderProps> = ({
  tabs,
  onTabChange,
  firstRoute,
  secondRoute,
}) => {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState(tabs);

  const initialLayout = { width: Dimensions.get("window").width };

  const renderScene = SceneMap({
    first: () => firstRoute,
    second: () => secondRoute,
  });

  const renderTabBar = (props: any) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route: any, i: number) => {
          const color = index === i ? "#1f2937" : "#a1a1aa";
          const borderColor = index === i ? "cyan.500" : "coolGray.200";

          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              key={i}
            >
              <Pressable
                onPress={() => {
                  setIndex(i);
                  onTabChange(i);
                }}
              >
                <Animated.Text style={{ color }}>{route.title}</Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{ marginTop: StatusBar.currentHeight }}
    />
  );
};

export default TabsHeader;
