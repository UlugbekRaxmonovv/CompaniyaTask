import axios from "axios";

const API_BASE = "http://45.138.158.137:92/api/";
const token = localStorage.getItem("token");

export interface RegisterData {
  fullName: string;
  login: string;
  password: string;
}

export interface LoginData {
  login: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await axios.post(`${API_BASE}auths/sign-up`, data);
  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await axios.post(`${API_BASE}auths/sign-in`, data);
  return response.data;
};
export const fetchRepos = async () => {
  const response = await axios.get(`${API_BASE}companies/get-all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const addCompany = async (company: { name: string; count: number }) => {
  const { data } = await axios.post(`${API_BASE}companies/add`, company, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
