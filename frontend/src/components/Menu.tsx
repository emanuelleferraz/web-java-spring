import { Link } from "react-router-dom"

const Menu = () => {

    return (
        <nav className="flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/users">Usuários</Link>
            <Link to="#">Tickets</Link>
            <Link to="#">Perfil</Link>
            <Link to="#">Relatórios</Link>
        </nav>
    )


}

export default Menu