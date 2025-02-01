import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCompany, fetchCompanies } from "../../api/api"; // fetchCompanies ni import qilish

const AddCompany: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient(); // QueryClientni olish

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: addCompany,
    onSuccess: () => {
      message.success("Компания успешно добавлена!");
      queryClient.invalidateQueries(["companies"]); // "companies" query yangilandi
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
      <Button
        onClick={handleOpenModal}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        Добавить компанию
      </Button>
      <Modal
        title="Добавить компанию"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={form} onFinish={handleAddCompany} layout="vertical">
          <Form.Item
            label="Название компании"
            name="name"
            rules={[{ required: true, message: "Введите название компании" }]}
          >
            <Input placeholder="Введите название компании" />
          </Form.Item>
          <Form.Item
            label="Количество сотрудников"
            name="count"
            rules={[{ required: true, message: "Введите количество сотрудников" }]}
          >
            <Input type="number" placeholder="Введите количество сотрудников" />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={handleCloseModal}>Отмена</Button>
            <Button type="primary" htmlType="submit" loading={mutation.isPending}>
              Добавить
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddCompany;
