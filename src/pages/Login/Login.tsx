import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { loginUser, LoginData } from "../../api/api";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/IMG/backgroundImage.jpg";
const Login: React.FC = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (values: LoginData) => {
      return loginUser(values);
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
  className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat
  bg-left-bottom
 relative"
  style={{ backgroundImage: `url(${backgroundImage})` }}
>
  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

  <Card className="w-full max-w-md p-6 shadow-xl rounded-lg relative z-10 bg-white bg-opacity-90">
    <Title level={2} className="mb-4 text-center">
      Вход
    </Title>
    <Form name="register" layout="vertical" onFinish={mutation.mutate} className="space-y-2">
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
        <Input.Password placeholder="Введите пароль" className="h-10 text-base" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={mutation.isPending} block>
          Вход
        </Button>
      </Form.Item>
    </Form>
    <Button
      type="link"
      onClick={() => navigate("/register")}
      className="text-blue-500 w-full text-center"
    >
      Регистрация
    </Button>
  </Card>
</div>






  );
};

export default Login;
