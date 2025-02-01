import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { registerUser, RegisterData } from "../../api/api";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/IMG/backgroundImage.jpg";

const { Title } = Typography;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (values: RegisterData) => {
      return registerUser(values);
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data);
      message.success("Ro‘yxatdan o‘tish muvaffaqiyatli! Endi tizimga kiring.");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Xatolik yuz berdi!");
    },
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Card className="w-full max-w-md p-6 shadow-xl rounded-lg">
        <Title level={2} className="text-center mb-4">
          Регистрация
        </Title>
        <Form
          name="register"
          layout="vertical"
          onFinish={mutation.mutate}
          className="space-y-2"
        >
          <Form.Item
            label="Ф.И.О"
            name="fullName"
            rules={[{ required: true, message: "Ism kiritish shart!" }]}
          >
            <Input
              placeholder="Введите Ф.И.О"
              className="h-10 text-base mt-[-15px]"
            />
          </Form.Item>
          <Form.Item
            label="Логин"
            name="login"
            rules={[{ required: true, message: "Login kiritish shart!" }]}
          >
            <Input placeholder="Введите логин" className="h-10 text-base" />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Parol kiritish shart!" }]}
          >
            <Input.Password
              placeholder="Введите пароль"
              className="h-10 text-base"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={mutation.isPending}
              block
            >
              Вход
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="link"
          onClick={() => navigate("/")}
          className="text-blue-500 w-full text-center"
        >
          Логин
        </Button>
      </Card>
    </div>
  );
};

export default Register;
