import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCompany } from "../../api/api";

const AddCompany: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: addCompany,
    onSuccess: () => {
      message.success("Компания успешно добавлена!");
      queryClient.invalidateQueries(["companies"]);
      handleCloseModal();
    },
    onError: () => {
      message.error("Ошибка при добавлении компании");
    },
  });

  const handleAddCompany = async (values: { name: string; count: number }) => {
    mutation.mutate(values);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-[#08979C] hover:bg-[#077b7e] text-white px-4 py-2 rounded-md cursor-pointer whitespace-nowrap

"
      >
        Добавить компанию
      </button>

      <Modal
        title="Добавить компанию"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={form} onFinish={handleAddCompany} layout="vertical">
          <div className="flex justify-start items- gap-8">
            <div className="mt-[5px] w-[200px]">
              <p>Названия компании</p>
            </div>
            <div className="">
              <Form.Item name="name" className=" w-[250px]"  rules={[{ required: true, message: "Введите названия" }]}>
                <Input placeholder="Введите названия"  />
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-start items-center gap-8">
            <div className="-mt-[25px] w-[200px]">
              <p>Количество сотрудников</p>
            </div>
            <div className="">
              <div className="">
                <Form.Item name="count" className=" w-[250px] "  rules={[{ required: true, message: "Введите количество" }]}>
                  <Input type="number" placeholder="Введите количество" />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex  justify-center items-center">
            {/* <Button onClick={handleCloseModal}>Отмена</Button> */}
            <Button
              type="primary"
              htmlType="submit"
              loading={mutation.isPending}
            >
              Добавить компания
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddCompany;
