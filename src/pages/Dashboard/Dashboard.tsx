import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, Spin, Modal } from 'antd';
import { fetchRepos } from '../../api/api';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import AddCompany from '../../components/AddCompany/AddCompany';

const Dashboard: React.FC = () => {
  const navigator = useNavigate()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['repos'], 
    queryFn: fetchRepos, 
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    setIsModalOpen(false);
    localStorage.removeItem('token')
    navigator('/')
  };

  const columns = [
    {
      title: 'Названия компании',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Количество сотрудников',
      dataIndex: 'count',
      key: 'count',
    }
  ];

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">
    <Spin size="large" />
  </div>; 

  if (isError) return <div>Xatolik yuz berdi: {error instanceof Error ? error.message : 'Unknown error'}</div>; 

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-900 text-white p-4">
        <h1 className="text-lg font-semibold">Компания</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsModalOpen(true)} className="text-gray-300 hover:text-white">
            <RiLogoutCircleLine className="w-5 h-5 cursor-pointer" />
          
          </button>
          <AddCompany/>
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
    </div>
  );
};

export default Dashboard;
