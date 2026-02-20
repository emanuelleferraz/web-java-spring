import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api.ts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { EventInterface } from "@/types/events";
import type { UserInterface } from "@/types/users";
import { ChevronLeft, ShoppingCart, Loader2 } from "lucide-react";

const SaleForm = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<EventInterface[]>([]);
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        userId: "",
        eventId: "",
    });

    useEffect(() => {
        Promise.all([
            api.get("/sales/events"),
            api.get("/users")
        ]).then(([evRes, usRes]) => {
            setEvents(evRes.data);
            setUsers(usRes.data);
        }).catch(err => console.error("Erro ao carregar dados:", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Enviamos apenas o necessário para criar a entidade no estado inicial
            await api.post("/sales", formData);
            navigate("/sales");
        } catch (error) {
            console.error("Erro ao realizar venda", error);
            alert("Ocorreu um erro ao processar a venda.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-[600px] mx-auto space-y-6">
            <Button
                variant="ghost"
                onClick={() => navigate("/sales")}
                className="gap-2 hover:bg-slate-100 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" /> Voltar para Vendas
            </Button>

            <Card className="relative overflow-hidden border-2 border-slate-100 shadow-xl rounded-2xl">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-black" />
                <CardHeader>
                    <CardTitle className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                        Nova Venda de Ingresso
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="font-bold text-xs uppercase text-slate-500">
                                Comprador
                            </Label>
                            <select
                                required
                                className="w-full h-12 px-3 rounded-md border border-slate-200 focus:ring-1 focus:ring-black outline-none bg-slate-50 text-sm"
                                value={formData.userId}
                                onChange={e => setFormData({...formData, userId: e.target.value})}
                            >
                                <option value="">Selecione um usuário...</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>
                                        {u.name} ({u.email})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold text-xs uppercase text-slate-500">
                                Evento
                            </Label>
                            <select
                                required
                                className="w-full h-12 px-3 rounded-md border border-slate-200 focus:ring-1 focus:ring-black outline-none bg-slate-50 text-sm"
                                value={formData.eventId}
                                onChange={e => setFormData({...formData, eventId: e.target.value})}
                            >
                                <option value="">Selecione um evento...</option>
                                {events.map(ev => (
                                    <option key={ev.id} value={ev.id}>
                                        {ev.description} — R$ {ev.price}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                            <p className="text-[11px] text-slate-500 text-center leading-relaxed uppercase font-semibold">
                                Nota: Toda nova venda é registrada automaticamente com o status
                                <span className="text-black ml-1">"EM ABERTO"</span>.
                            </p>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading || !formData.userId || !formData.eventId}
                            className="w-full bg-black hover:bg-slate-800 text-white font-bold h-14 uppercase tracking-widest transition-all"
                        >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Finalizar Venda"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SaleForm;