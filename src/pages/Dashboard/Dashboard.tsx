import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Table, Spin, Modal, message, Menu, Dropdown } from "antd";
import { fetchRepos, deleteCompany, updateCompany } from "../../api/api";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import AddCompany from "../../components/AddCompany/AddCompany";
import { MoreOutlined } from "@ant-design/icons";
import EditModal from "../../components/EditModal/EditModal";
import DeleteModal from "../../components/DeleteCompany/DeleteModal";

const Dashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["repos"],
    queryFn: fetchRepos,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editCompany, setEditCompany] = useState<{
    id: string;
    name: string;
    count: number;
  } | null>(null);

  const [companyIdToDelete, setCompanyIdToDelete] = useState<string | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = (id: string) => {
    setCompanyIdToDelete(id);
    setIsDeleteModalOpen(true);
  };
  const handleLogout = () => {
    setIsModalOpen(false);
    localStorage.removeItem("token");
    navigator("/");
  };

  const deleteMutation = useMutation({
    mutationFn: (deletes:{id: string}) => {
      const token = localStorage.getItem("token") || "";
      return deleteCompany(deletes, token);
    },
    onSuccess: () => {
      message.success("Компания успешно удалена!");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: () => {
      message.error("Ошибка при удалении компании");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (companyData: { id: string; name: string; count: number }) => {
      const token = localStorage.getItem("token") || "";
      return updateCompany(companyData, token);
    },
    onSuccess: () => {
      message.success("Компания успешно обновлена!");
      queryClient.invalidateQueries({
        queryKey: ["companies"]
      });
      setIsUpdateModalOpen(false);
    },
    onError: () => {
      message.error("Ошибка при обновлении компании");
    },
  });

  const handleDeleteCompany = (id: any) => {
    deleteMutation.mutate(id);
  };

  const handleUpdateCompany = (companyData: {
    id: string;
    name: string;
    count: number;
  }) => {
    updateMutation.mutate(companyData);
  };

  const handleOpenUpdateModal = (company: {
    id: string;
    name: string;
    count: number;
  }) => {
    setEditCompany(company);
    setIsUpdateModalOpen(true);
  };

  const columns = [
    {
      title: <div className="text-center">{"№"}</div>,
      width: 20,
      render: (_: any, __: any, index: number) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: "Названия компании",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Количество сотрудников",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: { id: string; name: string; count: number }) => {
        const menu = (
          <Menu>
            <Menu.Item key="1" onClick={() => handleOpenDeleteModal(record.id)}>
              Удалить
            </Menu.Item>
            <Menu.Item key="2" onClick={() => handleOpenUpdateModal(record)}>
              Обновить
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <MoreOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
          </Dropdown>
        );
      },
    },
  ];

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );

  if (isError)
    return (
      <div>
        Xatolik yuz berdi:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-900 text-white p-4">
        <h1 className="text-lg font-semibold">Компания</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-gray-300 hover:text-white"
          >
            <RiLogoutCircleLine className="w-5 h-5 cursor-pointer" />
          </button>
          <AddCompany />
        </div>
      </div>

      <Table dataSource={data} columns={columns} rowKey="id" />

      <Modal
        title="Выход из системы"
        open={isModalOpen}
        onOk={handleLogout}
        onCancel={() => setIsModalOpen(false)}
        okText="Выйти"
        cancelText="Отмена"
        okButtonProps={{ className: "bg-red-600 hover:bg-red-700 text-white" }}
      >
        <p>Вы уверены, что хотите выйти?</p>
      </Modal>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteCompany}
        companyId={companyIdToDelete}
      />

      <EditModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateCompany}
        companyData={editCompany}
      />
    </div>
  );
};

export default Dashboard;
