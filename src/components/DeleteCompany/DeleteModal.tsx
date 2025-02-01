import React from 'react';
import { Modal, message } from 'antd';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  companyId: string | null;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  companyId,
}) => {
  const handleDelete = () => {
    if (companyId) {
      onDelete(companyId);
      onClose();
    } else {
      message.error("Компания не найдена.");
    }
  };

  return (
    <Modal
      title="Удаление компании"
      open={isOpen}
      onOk={handleDelete}
      onCancel={onClose}
      okText="Удалить"
      cancelText="Отмена"
      okButtonProps={{ className: "bg-red-600 hover:bg-red-700 text-white" }}
    >
      <p>Вы уверены, что хотите удалить эту компанию?</p>
    </Modal>
  );
};

export default DeleteModal;
