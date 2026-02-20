import { useEffect, useState } from "react";
import api from "@/services/api.ts";
import { type SaleInterface, SaleStatusLabels, SaleStatusColors } from "@/types/sales";
import { type UserInterface } from "@/types/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, Users, DollarSign, TrendingUp, Loader2 } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
    const [sales, setSales] = useState<SaleInterface[]>([]);
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [loading, setLoading] = useState(true);

    const userData = JSON.parse(localStorage.getItem("@EventPass:user") || "{}");
    const userName = userData.name || "Usuário";

    useEffect(() => {
        Promise.all([api.get("/sales"), api.get("/users")])
            .then(([salesRes, usersRes]) => {
                setSales(salesRes.data);
                setUsers(usersRes.data);
            })
            .catch((err) => console.error("Erro dashboard:", err))
            .finally(() => setLoading(false));
    }, []);

    // --- CÁLCULOS DE MÉTRICAS ---
    const totalVendas = sales.length;
    const receitaTotal = sales
        .filter(s => s.status === "PAGO")
        .reduce((acc, s) => acc + (s.event.price || 0), 0);

    const totalUsuarios = users.length;

    // Taxa de Conversão: (Usuários que compraram / Total de Usuários)
    const usuariosComCompra = new Set(sales.map(s => s.userId)).size;
    const taxaConversao = totalUsuarios > 0
        ? ((usuariosComCompra / totalUsuarios) * 100).toFixed(1)
        : "0";

    // --- LÓGICA DO GRÁFICO (Agrupado por Dia para ver a linha) ---
    const getChartData = () => {
        // Criamos os últimos 7 dias para o eixo X
        const days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
        }).reverse();

        return days.map(dayLabel => {
            const salesInDay = sales.filter(s =>
                new Date(s.dateTime).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) === dayLabel
            );
            return {
                name: dayLabel,
                vendas: salesInDay.length,
            };
        });
    };

    const chartData = getChartData();

    // Top Compradores Reais
    const topBuyers = Object.entries(
        sales.reduce((acc: any, sale) => {
            acc[sale.userId] = (acc[sale.userId] || 0) + 1;
            return acc;
        }, {})
    )
        .map(([id, count]) => ({
            name: users.find(u => u.id === id)?.name || "Usuário",
            count: count as number
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-black" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-[1600px] mx-auto space-y-8 bg-white text-black font-sans">
            {/* Cabeçalho Original Mantido */}
            <div className="flex flex-col gap-1 border-l-4 border-black pl-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                    Painel Administrativo
                </h3>
                <h1 className="text-2xl font-bold tracking-tight">
                    Bem-vindo, {userName}!
                </h1>
            </div>

            {/* 1. Cards de Métricas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard title="Total de Vendas" value={totalVendas} icon={Ticket} detail="Tickets" />
                <MetricCard title="Receita Total" value={`R$ ${receitaTotal.toLocaleString()}`} icon={DollarSign} detail="BRL" />
                <MetricCard title="Usuários Ativos" value={totalUsuarios} icon={Users} detail="Base" />
                <MetricCard title="Taxa de Conversão" value={`${taxaConversao}%`} icon={TrendingUp} detail="Engajamento" />
            </div>

            {/* 2. Gráfico e Top 5 */}
            <div className="grid gap-6 md:grid-cols-7">
                <Card className="md:col-span-5 border border-slate-100 shadow-xl rounded-2xl overflow-hidden bg-white">
                    <CardHeader className="bg-slate-50/30 border-b border-slate-100">
                        <CardTitle className="text-sm font-bold uppercase tracking-tight text-slate-700">
                            Desempenho de Vendas (Últimos 7 Dias)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px] pt-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#000" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#000" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="vendas" stroke="#000" strokeWidth={3} fill="url(#colorVendas)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 border border-slate-100 shadow-xl rounded-2xl bg-white">
                    <CardHeader className="bg-slate-50/30 border-b border-slate-100">
                        <CardTitle className="text-sm font-bold uppercase text-slate-700">
                            Top Compradores
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            {topBuyers.map((buyer, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <span className="text-xs font-black text-black bg-slate-100 w-6 h-6 flex items-center justify-center rounded-full">
                                        {i + 1}
                                    </span>
                                    <div className="flex-1 border-b border-slate-50 pb-2">
                                        <p className="text-sm font-bold">{buyer.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                            {buyer.count} tickets comprados
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Tabela com Cores Corrigidas */}
            <Card className="border border-slate-100 shadow-2xl rounded-[24px] overflow-hidden bg-white">
                <div className="bg-black px-6 py-4">
                    <h3 className="font-bold text-white text-sm uppercase tracking-widest italic">
                        Vendas Recentes
                    </h3>
                </div>
                <Table>
                    <TableHeader className="bg-black sticky top-0 z-10">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="text-white font-bold h-12 text-[13px] px-6">Usuário</TableHead>
                            <TableHead className="text-white font-bold h-12 text-[13px]">Evento</TableHead>
                            <TableHead className="text-white font-bold h-12 text-[13px]">Preço</TableHead>
                            <TableHead className="text-white font-bold h-12 text-[13px] text-center">Status</TableHead>
                            <TableHead className="text-white font-bold h-12 text-[13px] text-right px-6">Data</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sales.slice(-10).reverse().map((sale) => (
                            <TableRow key={sale.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <TableCell className="font-semibold text-slate-900 text-[13px] px-6 py-4">
                                    {users.find(u => u.id === sale.userId)?.name || "..."}
                                </TableCell>
                                <TableCell className="text-slate-500 text-[13px] font-medium italic">
                                    {sale.event.description}
                                </TableCell>
                                <TableCell className="font-bold text-[14px]">
                                    R$ {sale.event.price?.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-center">
                                    {/* CORES PADRONIZADAS AQUI */}
                                    <Badge className={`border shadow-none ${SaleStatusColors[sale.status]}`}>
                                        {SaleStatusLabels[sale.status]}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right text-slate-400 text-[12px] font-medium px-6">
                                    {new Date(sale.dateTime).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}

// Sub-componente para os Metrics Cards
function MetricCard({ title, value, icon: Icon, detail }: any) {
    return (
        <Card className="relative overflow-hidden border border-slate-200 rounded-xl shadow-sm bg-white">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-black" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-3 pb-1 px-4">
                <CardTitle className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                    {title}
                </CardTitle>
                <Icon className="w-3.5 h-3.5 text-black" />
            </CardHeader>
            <CardContent className="px-4 pb-3">
                <div className="text-lg font-bold tracking-tight">{value}</div>
                <span className="text-[8px] mt-1 inline-block font-black bg-black text-white px-1.5 py-0.5 rounded-sm uppercase italic">
                    {detail}
                </span>
            </CardContent>
        </Card>
    );
}