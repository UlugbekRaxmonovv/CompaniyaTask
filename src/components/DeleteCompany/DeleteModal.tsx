import React from 'react';
import { Modal, message } from 'antd';
import { VscInfo } from 'react-icons/vsc';

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
      open={isOpen}
      onOk={handleDelete}
      onCancel={onClose}
      okText="Да"
      cancelText="Нет"
      width={315}
      closable={false}
      okButtonProps={{ className: "bg-red-600 hover:bg-red-700 text-white" }}
    >
      <div className="flex gap-2 items-center">
      <VscInfo  className= "text-yellow-900"   /><p>
      Вы хотите удалить?</p>
      </div>
    </Modal>
  );
};

export default DeleteModal;
