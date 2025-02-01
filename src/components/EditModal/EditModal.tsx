import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (companyData: { id: string; name: string; count: number }) => void;
  companyData: { id: string; name: string; count: number } | null;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSubmit, companyData }) => {
  const [name, setName] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (companyData) {
      setName(companyData.name);
      setCount(companyData.count);
    }
  }, [companyData]);

  const handleSubmit = () => {
    if (companyData) {
      onSubmit({ id: companyData.id, name, count });
    }
  };

  return (
    <Modal
      title="Обновить компанию"
      open={isOpen}
      onOk={handleSubmit}
      onCancel={onClose}
      okText="Обновить"
      cancelText="Отмена"
    >
      {companyData && (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Название компании</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Количество сотрудников</label>
            <Input
              type="number"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditModal;
