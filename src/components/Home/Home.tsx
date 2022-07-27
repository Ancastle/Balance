import * as React from "react";
import { Center } from "native-base";

// Components
import { TabsHeader } from "../Shared";
import Graphs from "./Graphs";

// Contexts
import { PreferencesContext } from "../Contexts";
import History from "./History";

// Types
import { Tab } from "../types";

// Utils
import { LANGUAGES } from "../statics";

// Store
import {
  fetchTransactionsAsync,
  selectTransactionsStatus,
} from "../../app/transactionsSlice";
import { fetchCategoriesAsync } from "../../app/categoriesSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const transactionsStatus = useAppSelector(selectTransactionsStatus);

  React.useEffect(() => {
    if (transactionsStatus === "idle") {
      dispatch(fetchTransactionsAsync());
      dispatch(fetchCategoriesAsync());
    }
  }, []);

  const { appLanguage } = React.useContext(PreferencesContext);

  const tabs: Tab[] = [
    { key: "first", title: LANGUAGES.home.tabs.home[appLanguage] },
    { key: "second", title: LANGUAGES.home.tabs.charts[appLanguage] },
    { key: "third", title: LANGUAGES.home.tabs.history[appLanguage] },
  ];
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
