import Menu from "./Menu";

interface AppHeaderInterface {
    title?: string;
}

const AppHeader = ({ title } : AppHeaderInterface) => {

    let renderTitle
    if (title !== undefined) {
        renderTitle =
            <div className="flex justify-center">
                <h2 className="text-xl font-bold">{ title }</h2>
            </div>
    }

    return (
        <>
            <header>
                <h1 className="text-3xl font-extrabold text-indigo-800">Sistema de Vendas de Tickets</h1>
                <div>
                    {/* Menu da aplicação */}
                    <Menu />
                </div>
            </header>

            { renderTitle }

        </>
    )

}

export default AppHeader