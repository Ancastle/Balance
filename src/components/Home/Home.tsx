import * as React from "react";
import { Center } from "native-base";

// Components
import { TabsHeader } from "../Shared";
import Graphs from "./Graphs";

// Contexts
import History from "./History";

// Types
import { Tab } from "../types";

// Utils
import { LANGUAGES } from "../statics";

// Store
import {
  fetchTransactionsAsync,
  selectTransactionsStatus,
  fetchCategoriesAsync,
  fetchPreferencesAsync,
  selectPreferencesLanguage,
  useAppSelector,
  useAppDispatch,
} from "../../store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const appLanguage = useAppSelector(selectPreferencesLanguage);
  const transactionsStatus = useAppSelector(selectTransactionsStatus);

  const tabs: Tab[] = [
    { key: "first", title: LANGUAGES.home.tabs.home[appLanguage] },
    { key: "second", title: LANGUAGES.home.tabs.charts[appLanguage] },
    { key: "third", title: LANGUAGES.home.tabs.history[appLanguage] },
  ];

  React.useEffect(() => {
    if (transactionsStatus === "idle") {
      dispatch(fetchTransactionsAsync());
      dispatch(fetchCategoriesAsync());
      dispatch(fetchPreferencesAsync());
    }
  }, []);

  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={<Center flex={1}>3</Center>}
      secondRoute={
        <Center flex={1}>
          <Graphs />
        </Center>
      }
      thirdRoute={<History />}
    />
  );
};

export default Home;
