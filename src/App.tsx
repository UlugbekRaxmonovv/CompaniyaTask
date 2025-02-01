import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register/Register"; 
import Login from "./pages/Login/Login"; 
import Dashboard from "./pages/Dashboard/Dashboard"; 
import Auth from "./pages/Auth/Auth";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Auth/>} >
          <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </QueryClientProvider>
  );
};

export default App;
