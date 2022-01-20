import React from "react";

// Components
import AddTransactionModal from "../../Shared/AddTransactionModal";

interface AddExpenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddExpenceModal: React.FC<AddExpenceModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AddTransactionModal isOpen={isOpen} onClose={onClose} type="expence" />
  );
};

export default AddExpenceModal;
