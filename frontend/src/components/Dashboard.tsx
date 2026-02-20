import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, Users, DollarSign, TrendingUp } from "lucide-react";
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

const salesData = [
    { month: "Jan", tickets: 4000, receita: 2400 },
    { month: "Fev", tickets: 3000, receita: 1398 },
    { month: "Mar", tickets: 5000, receita: 3800 },
    { month: "Abr", tickets: 2780, receita: 3908 },
    { month: "Mai", tickets: 1890, receita: 4800 },
    { month: "Jun", tickets: 2390, receita: 3800 },
    { month: "Jul", tickets: 3490, receita: 4300 },
];

export default function Dashboard() {
    const userData = JSON.parse(localStorage.getItem("@EventPass:user") || "{}");
    const userName = userData.name || "Usuário";

    const recentSales = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        user: "Carlos Eduardo",
        event: "Festival de Inverno 2026",
        price: "R$ 150,00",
        status: "Aprovado",
        date: "20/02/2026",
    }));

    return (
        <div className="p-6 max-w-[1600px] mx-auto space-y-8 bg-white text-black font-sans">
            {/* Cabeçalho */}
            <div className="flex flex-col gap-1 border-l-4 border-black pl-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                    Painel Administrativo
                </h3>
                <h1 className="text-2xl font-bold tracking-tight">
                    Bem-vindo, {userName}!
                </h1>
            </div>

            {/* 1. Cards de Métricas - Versão Compacta */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total de Vendas", value: "2.840", icon: Ticket, detail: "Tickets" },
                    { title: "Receita Total", value: "R$ 142.500", icon: DollarSign, detail: "BRL" },
                    { title: "Usuários Ativos", value: "1.205", icon: Users, detail: "Logados" },
                    { title: "Taxa de Conversão", value: "12.4%", icon: TrendingUp, detail: "+2.1%" },
                ].map((item, index) => (
                    <Card
                        key={index}
                        className="relative overflow-hidden border border-slate-200 rounded-xl shadow-sm bg-white"
                    >
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-black" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-3 pb-1 px-4">
                            <CardTitle className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                                {item.title}
                            </CardTitle>
                            <item.icon className="w-3.5 h-3.5 text-black" />
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="text-lg font-bold tracking-tight">{item.value}</div>
                            <span className="text-[8px] mt-1 inline-block font-black bg-black text-white px-1.5 py-0.5 rounded-sm uppercase italic">
                {item.detail}
              </span>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* 2. Gráfico e Top 5 */}
            <div className="grid gap-6 md:grid-cols-7">
                <Card className="md:col-span-5 border border-slate-100 shadow-2xl shadow-slate-200/60 rounded-2xl overflow-hidden bg-white">
                    <CardHeader className="bg-slate-50/30 border-b border-slate-100">
                        <CardTitle className="text-sm font-bold uppercase tracking-tight text-slate-700">
                            Desempenho de Vendas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px] pt-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#be185d" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#be185d" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4338ca" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#4338ca" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                                <Tooltip contentStyle={{ border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                                <Area type="monotone" dataKey="tickets" stroke="#be185d" strokeWidth={3} fill="url(#colorTickets)" />
                                <Area type="monotone" dataKey="receita" stroke="#4338ca" strokeWidth={3} fill="url(#colorReceita)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 border border-slate-100 shadow-2xl shadow-slate-200/60 rounded-2xl bg-white">
                    <CardHeader className="bg-slate-50/30 border-b border-slate-100">
                        <CardTitle className="text-sm font-bold uppercase text-slate-700">
                            Top Compradores
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                  <span className="text-xs font-black text-black bg-slate-100 w-6 h-6 flex items-center justify-center rounded-full">
                    {i}
                  </span>
                                    <div className="flex-1 border-b border-slate-50 pb-2">
                                        <p className="text-sm font-bold">Cliente Exemplo {i}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                            {20 - i} tickets comprados
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Tabela */}
            <Card className="border border-slate-100 shadow-2xl shadow-slate-200/60 rounded-[24px] overflow-hidden bg-white">
                <div className="bg-black px-6 py-4">
                    <h3 className="font-bold text-white text-sm uppercase tracking-widest italic">
                        Vendas Recentes
                    </h3>
                </div>
                <div className="max-h-[500px] overflow-y-auto">
                    <Table>
                        <TableHeader className="bg-black sticky top-0 z-10">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="text-white font-bold h-12 text-[13px] px-6">Usuário</TableHead>
                                <TableHead className="text-white font-bold h-12 text-[13px]">Evento</TableHead>
                                <TableHead className="text-white font-bold h-12 text-[13px]">Preço</TableHead>
                                <TableHead className="text-white font-bold h-12 text-[13px] text-right">Status</TableHead>
                                <TableHead className="text-white font-bold h-12 text-[13px] text-right px-6">Data</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentSales.map((sale) => (
                                <TableRow key={sale.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <TableCell className="font-semibold text-slate-900 text-[13px] px-6 py-4">
                                        {sale.user}
                                    </TableCell>
                                    <TableCell className="text-slate-500 text-[13px] font-medium italic">
                                        {sale.event}
                                    </TableCell>
                                    <TableCell className="font-bold text-[14px]">
                                        {sale.price}
                                    </TableCell>
                                    <TableCell className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-100">
                      {sale.status}
                    </span>
                                    </TableCell>
                                    <TableCell className="text-right text-slate-400 text-[12px] font-medium px-6">
                                        {sale.date}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}