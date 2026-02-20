import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import ListUsers from "./pages/users/ListUsers";
import ListEvents from "./pages/events/ListEvents";
import EventForm from "./pages/events/EventForm";
import AppHeader from "./components/AppHeader";
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

                {/* Rota Principal*/}
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

                {/* Rota de Usuários*/}
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

                {/* Rota de Eventos */}
                <Route
                    path="/events"
                    element={
                        <PrivateRoute>
                            <>
                                <AppHeader title="Gerenciamento de Usuários" />
                                <ListEvents />
                            </>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/events/new"
                    element={
                        <PrivateRoute>
                            <>
                                <AppHeader title="Gerenciamento de Usuários" />
                                <EventForm />
                            </>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/events/edit/:id"
                    element={
                        <PrivateRoute>
                            <>
                                <AppHeader title="Gerenciamento de Usuários" />
                                <EventForm />
                            </>
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};