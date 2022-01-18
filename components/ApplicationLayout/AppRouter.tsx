import React from "react";

//Components
import Footer from "./Footer";
import Home from "../Home";
import Expences from "../Expences";
import Entries from "../Entries/Entries";
import Balance from "../Balance/Balance";
import Settings from "../Settings";

const AppRouter: React.FC = () => {
  const [currentSection, setCurrentSection] = React.useState(0);
  return (
    <>
      {currentSection === 0 ? (
        <Home />
      ) : currentSection === 1 ? (
        <Expences />
      ) : currentSection === 2 ? (
        <Entries />
      ) : currentSection === 3 ? (
        <Balance />
      ) : (
        currentSection === 4 && <Settings />
      )}
      <Footer
        currentSection={currentSection}
        onChangeSection={setCurrentSection}
      />
    </>
  );
};

export default AppRouter;
