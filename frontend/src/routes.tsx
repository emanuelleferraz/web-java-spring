import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ListUsers from "./pages/users/ListUsers";

export default function AppRoutes() {

    return(

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<App />}
                />

                <Route
                    path="/users"
                    element={<ListUsers />}
                />

            </Routes>

        </BrowserRouter>

    )

}