import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import loading from '../../assets/Video/loading.mp4'

const fetchAuthToken = async (): Promise<string | null> => {
    return localStorage.getItem("token");
};

const Auth: React.FC = () => {
    const { data: token, isLoading } = useQuery({
        queryKey: ["authToken"],
        queryFn: fetchAuthToken,
    });

    if (isLoading) return (
        <div className="w-full h-full flex justify-center items-center">
            Loading.....
            <video className="w-1/2 h-auto" autoPlay loop muted>
                <source src={loading} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
    
    return token ? <Outlet /> : <Navigate replace to="/" />;
};

export default Auth;
