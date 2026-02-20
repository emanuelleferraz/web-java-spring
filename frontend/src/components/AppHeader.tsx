import Menu from "./Menu";

interface AppHeaderInterface {
    title?: string;
}

const AppHeader = ({ title } : AppHeaderInterface) => {
    return (
        <header className="bg-white border-b shadow-sm p-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo alinhada com o Login */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🎟️</span>
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                        EventPass
                    </h1>
                    <span className="ml-2 text-xs font-medium text-muted-foreground hidden md:block">
                        | Sistema Administrativo
                    </span>
                </div>

                {/* Menu da aplicação */}
                <nav>
                    <Menu />
                </nav>
            </div>

            {title && (
                <div className="mt-4 flex justify-center">
                    <h2 className="text-lg font-semibold text-slate-700">{title}</h2>
                </div>
            )}
        </header>
    );
};

export default AppHeader;