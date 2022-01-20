import React from "react";

// Components
import FabComponent from "../../Shared/FabComponent";
import AddExpenceModal from "./AddExpenceModal";
import TransactionsList from "../../Shared/TransactionsList";

//Contexts
import { TransactionsContext } from "../../Contexts/TransactionsContextProvider";

//Types
import { LANGUAGES } from "../../statics";

//TBD: MAKE DINAMIC
const appLanguage = 1;

const DebitExpences: React.FC = () => {
  const { transactions } = React.useContext(TransactionsContext);

  const [showAddModal, setShowAddModal] = React.useState(false);

  const data = [
    {
      title: LANGUAGES.expences.debitLabels[appLanguage],
      data: transactions,
    },
  ];
  return (
    <>
      <TransactionsList data={data} type="expence" />
      <FabComponent onClick={() => setShowAddModal(true)} />
      <AddExpenceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
};
export default DebitExpences;
