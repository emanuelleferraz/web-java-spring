import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Menu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("@EventPass:user");
        navigate("/");
    };

    return (
        <nav className="flex items-center gap-6">
            <Link to="/home" className="text-white hover:text-gray-300 transition-colors">Home</Link>
            <Link to="/users" className="text-white hover:text-gray-300 transition-colors">Usuários</Link>
            <Link to="/events" className="text-white hover:text-gray-300 transition-colors">Eventos</Link>
            <Link to="#" className="text-white hover:text-gray-300 transition-colors">Vendas</Link>

            {/* Botão de Logout */}
            <Button
                onClick={handleLogout}
                className="bg-white text-black hover:bg-gray-200 font-bold ml-4 px-8"
                size="sm"
            >
                Sair
            </Button>
        </nav>
    );
};

export default Menu;