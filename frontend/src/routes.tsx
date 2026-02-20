import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import ListUsers from "./pages/users/ListUsers";
import AppHeader from "./components/AppHeader"; // Importe o Header
import Dashboard from "./components/Dashboard";
import type { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const user = localStorage.getItem("@EventPass:user");
    return user ? children : <Navigate to="/" />;
};

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota de Login */}
                <Route path="/" element={<Login />} />

                {/* Rota Principal com Header */}
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <>
                                <AppHeader title="Painel Principal" />
                                <Dashboard />
                            </>
                        </PrivateRoute>
                    }
                />

                {/* Rota de Usuários (Também com Header) */}
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <>
                                <AppHeader title="Gerenciamento de Usuários" />
                                <ListUsers />
                            </>
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};