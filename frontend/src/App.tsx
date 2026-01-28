import {Button} from "@/components/ui/button.tsx";
import ListUsers from "@/pages/users/ListUsers.tsx";

function App() {
   return (
       <>
           <h1 className="text-3xl font-bold">Sistema de Vendas Tickets</h1>

           <Button>
               Login
           </Button>

           <ListUsers/>
       </>
   )
}

export default App
