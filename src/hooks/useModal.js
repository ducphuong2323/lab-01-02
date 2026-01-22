// Custom Hook for Modal Management
import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedItem(null), 300); // Delay to allow animation
  };

  return {
    isOpen,
    selectedItem,
    openModal,
    closeModal,
  };
};

export default useModal;
