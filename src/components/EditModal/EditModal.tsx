import React, { useState, useEffect } from "react";
import { Modal, Input} from "antd";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (companyData: { id: string; name: string; count: number }) => void;
  companyData: { id: string; name: string; count: number } | null;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  companyData,
}) => {
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
        <>
       <div className="">
       <div className="flex justify-start  gap-8">
            <div className="mt-[5px] w-[200px]">
              <p>Названия компании</p>
            </div>
            <div className="">
              <Input
                placeholder="Введите названия"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width:'250px'
                 }}
              />
            </div>
          </div>

          <div className="flex justify-start items-center gap-8 mt-4">
            <div className="-mt-[0px] w-[200px]">
              <p>Количество сотрудников</p>
            </div>
            <div className="">
              <div className="">
              <Input
                  type="number"
                  placeholder="Введите количество"
                  style={{
                    width:'250px'
                   }}
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value, 10))}
                />
              </div>
            </div>
          </div>
          <div className="flex  justify-center items-center mt-4">
           
          </div>
       </div>
        </>
      )}
    </Modal>
  );
};

export default EditModal;
