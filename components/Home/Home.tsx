import * as React from "react";
import { Center } from "native-base";

// Components
import TabsHeader from "../Shared/TabsHeader";

// Contexts
import { PreferencesContext } from "../Contexts/PreferencesContextProvider";

// Types
import { Tab } from "../types";

// Utils
import { LANGUAGES } from "../statics";

const Home: React.FC = () => {
  const { preferences } = React.useContext(PreferencesContext);
  const appLanguage = React.useMemo(
    () => preferences.appLanguage,
    [preferences]
  );

  const [tabIndex, setTabIndex] = React.useState<number>(0);

  const tabs: Tab[] = [
    { key: "first", title: LANGUAGES.expence.tabs.debit[appLanguage] },
    { key: "second", title: LANGUAGES.expence.tabs.debt[appLanguage] },
  ];
  return (
    <TabsHeader
      tabs={tabs}
      firstRoute={<Center flex={1}>1</Center>}
      secondRoute={<Center flex={1}>2</Center>}
    />
  );
};

export default Home;
