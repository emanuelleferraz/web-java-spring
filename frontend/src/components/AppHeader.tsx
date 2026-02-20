import Menu from "./Menu";

interface AppHeaderInterface {
    title?: string;
}

const AppHeader = ({ }: AppHeaderInterface) => {
    return (
        <header className="bg-black shadow-md p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🎟️</span>
                    <h1 className="text-2xl font-extrabold tracking-tight text-white">
                        EventPass
                    </h1>
                </div>

                {/* Menu da aplicação */}
                <Menu />
            </div>
        </header>
    );
};

export default AppHeader;