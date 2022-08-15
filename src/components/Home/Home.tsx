import * as React from "react";
import { Center } from "native-base";

// Components
import { TabsHeader } from "../Shared";
import Graphs from "./Graphs";
import History from "./History";
import HomeScreen from "./HomeScreen";

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
  fetchCreditCardAsync,
  fetchPeopleAsync,
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
      dispatch(fetchCreditCardAsync());
      dispatch(fetchPeopleAsync());
    }
  }, []);

  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={<HomeScreen />}
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
