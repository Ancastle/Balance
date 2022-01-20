import * as React from "react";
import { Center } from "native-base";

// Components
import TabsHeader from "../Shared/TabsHeader";

// Contexts
import { TransactionsContextProvider } from "../Contexts/TransactionsContextProvider";
import { CategoriesContextProvider } from "../Contexts/CategoriesContextProvider";

// Types
import { Tab } from "../types";

// Utils
import { LANGUAGES } from "../statics";
import DebitExpences from "./DebitExpences";

//TBD: MAKE DINAMIC
const appLanguage = 1;

const Expences: React.FC = () => {
  const [tabIndex, setTabIndex] = React.useState<number>(0);

  const tabs: Tab[] = [
    { key: "first", title: LANGUAGES.expences.tabs.debit[appLanguage] },
    { key: "second", title: LANGUAGES.expences.tabs.debt[appLanguage] },
  ];
  return (
    <TransactionsContextProvider>
      <CategoriesContextProvider>
        <TabsHeader
          tabs={tabs}
          onTabChange={(tab: number) => {
            setTabIndex(tab);
          }}
          firstRoute={<DebitExpences />}
          secondRoute={<Center flex={1}>2</Center>}
        />
      </CategoriesContextProvider>
    </TransactionsContextProvider>
  );
};

export default Expences;
