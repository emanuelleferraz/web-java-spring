import { useEffect, useState } from "react";
import api from "@/services/api.ts";
import { type SaleInterface, SaleStatusLabels, SaleStatusColors } from "@/types/sales";
import { type UserInterface } from "@/types/users";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ListSales = () => {
    const navigate = useNavigate();
    const [sales, setSales] = useState<SaleInterface[]>([]);
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([
            api.get("/sales"),
            api.get("/users")
        ]).then(([salesRes, usersRes]) => {
            setSales(salesRes.data);
            setUsers(usersRes.data);
        }).catch(err => console.error("Erro nas vendas:", err));
    }, []);

    const getUserName = (userId: string) => {
        const user = users.find(u => u.id === userId);
        return user ? user.name : "Usuário não encontrado";
    };

    const handleStatusChange = async (saleId: string, newStatusName: string) => {
        setUpdatingId(saleId);
        try {
            // Agora enviando a STRING da constante, exatamente como no seu arquivo .rest
            await api.put(`/sales/${saleId}`, {
                status: newStatusName
            });

            // Atualiza o estado local para refletir a mudança
            setSales(prev => prev.map(s =>
                s.id === saleId ? { ...s, status: newStatusName as any } : s
            ));

        } catch (error: any) {
            console.error("Erro ao alterar status:", error.response?.data);
            // Captura a mensagem de erro do Java (ex: "Only open sales can be paid.")
            const errorMsg = error.response?.data?.message || "Erro ao atualizar status.";
            alert(errorMsg);
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="p-8 max-w-[1600px] mx-auto space-y-8 bg-white font-sans">
            <div className="flex justify-between items-center border-l-4 border-black pl-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-black">Gestão de Vendas</h1>
                    <p className="text-sm text-muted-foreground">Monitore e gerencie os ingressos vendidos.</p>
                </div>
                <Button onClick={() => navigate("/sales/new")} className="bg-black text-white hover:bg-slate-800 font-bold gap-2">
                    <Plus className="w-4 h-4" /> Nova Venda
                </Button>
            </div>

            <div className="rounded-md border border-slate-200 overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-black">
                        <TableRow>
                            <TableHead className="text-white font-bold h-10 px-6 text-[12px] uppercase tracking-wider">ID Venda</TableHead>
                            <TableHead className="text-white font-bold h-10 text-[12px] uppercase tracking-wider">Evento</TableHead>
                            <TableHead className="text-white font-bold h-10 text-[12px] uppercase tracking-wider">Comprador</TableHead>
                            <TableHead className="text-white font-bold h-10 text-[12px] uppercase tracking-wider">Data/Hora</TableHead>
                            <TableHead className="text-white font-bold h-10 text-[12px] uppercase tracking-wider text-center">Status</TableHead>
                            <TableHead className="text-white font-bold h-10 px-6 text-[12px] uppercase tracking-wider text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sales.map((sale) => (
                            <TableRow key={sale.id} className="hover:bg-slate-50 transition-colors">
                                <TableCell className="font-mono text-[10px] text-slate-400 px-6 italic">#{sale.id.slice(-6)}</TableCell>
                                <TableCell className="font-bold text-slate-900">
                                    <div className="flex flex-col">
                                        <span>{sale.event.description}</span>
                                        <span className="text-[10px] text-slate-400 font-normal">{sale.event.location}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[13px]">{getUserName(sale.userId)}</TableCell>
                                <TableCell className="text-[13px] text-slate-600">{new Date(sale.dateTime).toLocaleString('pt-BR')}</TableCell>
                                <TableCell className="text-center">
                                    <Badge className={`border shadow-none font-bold text-[10px] ${SaleStatusColors[sale.status]}`}>
                                        {SaleStatusLabels[sale.status]}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right px-6">
                                    <div className="flex items-center justify-end gap-2">
                                        {updatingId === sale.id && <Loader2 className="w-3 h-3 animate-spin text-slate-400" />}
                                        <select
                                            disabled={updatingId === sale.id}
                                            className="text-[11px] font-bold border border-slate-200 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50"
                                            onChange={(e) => handleStatusChange(sale.id, e.target.value)}
                                            value={sale.status}
                                        >
                                            <option value="EM_ABERTO">EM ABERTO</option>
                                            <option value="PAGO">PAGO</option>
                                            <option value="CANCELADO">CANCELADO</option>
                                            <option value="ESTORNADO">ESTORNADO</option>
                                        </select>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ListSales;