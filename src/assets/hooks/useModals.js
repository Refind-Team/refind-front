import { useState } from "react";
export function useModals() {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [savedItemInfo, setSavedItemInfo] = useState(null);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false); // vai ser implementado
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const OpenSuccessModal = (itemInfo) => {
    setSavedItemInfo(itemInfo);
    setSuccessModalOpen(true);
  };

  const closeSuccessModal = () => setSuccessModalOpen(false);

  const openCodeModal = () => setCodeModalOpen(true);
  const closeCodeModal = () => setCodeModalOpen(false);

  //vai ser implementado ainda
  const openDetailsModal = () => setDetailsModalOpen(true);
  const closeDetailsModal = () => setDetailsModalOpen(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const openConfirmModal = () => setConfirmModalOpen(true);
  const closeConfirmModal = () => setConfirmModalOpen(false);

  return {
    modals: {
      success: {
        isOpen: successModalOpen,
        open: OpenSuccessModal,
        close: closeSuccessModal,
      },
      code: {
        isOpen: codeModalOpen,
        open: openCodeModal,
        close: closeCodeModal,
      },
      details: {
        isOpen: detailsModalOpen,
        open: openDetailsModal,
        close: closeDetailsModal,
      },
      edit: {
        isOpen: editModalOpen,
        open: openEditModal,
        close: closeEditModal,
      },
      confirm: {
        isOpen: confirmModalOpen,
        open: openConfirmModal,
        close: closeConfirmModal,
      },
    },
    savedItemInfo,
  };
}
