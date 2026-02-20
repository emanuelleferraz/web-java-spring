import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/services/api.ts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Save } from "lucide-react";

// Mapeamento baseado no seu Enum Java para o <select>
const eventTypes = [
    { id: 1, label: "Palestra" },
    { id: 2, label: "Show" },
    { id: 3, label: "Teatro" },
    { id: 4, label: "Curso" },
    { id: 5, label: "Geral/Não especificado" },
];

const typeNameToId: Record<string, number> = {
    PALESTRA: 1,
    SHOW: 2,
    TEATRO: 3,
    CURSO: 4,
    GERAL: 5,
};

const EventForm = () => {
    const { id } = useParams(); // Se existir ID, é edição
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        description: "",
        type: 1,
        dateTime: "",
        startingSales: "",
        endingSales: "",
        location: "",
        price: 0,
    });

    // Se for edição, busca os dados atuais
    useEffect(() => {
        if (id) {
            api.get(`/sales/events/${id}`).then((response) => {
                const data = response.data;


                const typeValue = typeof data.type === 'string'
                    ? typeNameToId[data.type]
                    : data.type;

                setFormData({
                    description: data.description,
                    type: typeValue,
                    dateTime: data.dateTime,
                    startingSales: data.startingSales,
                    endingSales: data.endingSales,
                    location: data.location,
                    price: data.price,
                });
            });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (id) {
                await api.put(`/sales/events/${id}`, formData);
            } else {
                await api.post("/sales/events", formData);
            }
            navigate("/events");
        } catch (error) {
            console.error("Erro ao salvar evento:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-[800px] mx-auto space-y-6 bg-white font-sans">
            <Button
                variant="ghost"
                onClick={() => navigate("/events")}
                className="gap-2 text-slate-500 hover:text-black"
            >
                <ChevronLeft className="w-4 h-4" /> Voltar
            </Button>

            <Card className="relative overflow-hidden border-2 border-slate-100 shadow-2xl rounded-2xl">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-black" />

                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {id ? "Editar Evento" : "Novo Evento"}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

                        {/* Descrição */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="description" className="font-bold text-xs uppercase">Nome do Evento</Label>
                            <Input
                                id="description"
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder="Ex: Show do Imagine Dragons"
                                className="border-slate-200 focus-visible:ring-black"
                            />
                        </div>

                        {/* Tipo e Preço */}
                        <div className="space-y-2">
                            <Label htmlFor="type" className="font-bold text-xs uppercase">Tipo</Label>
                            <select
                                id="type"
                                className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: Number(e.target.value)})}
                            >
                                {eventTypes.map(t => (
                                    <option key={t.id} value={t.id}>{t.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price" className="font-bold text-xs uppercase">Preço (R$)</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                                className="border-slate-200 focus-visible:ring-black"
                            />
                        </div>

                        {/* Data do Evento */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="dateTime" className="font-bold text-xs uppercase">Data e Hora do Evento</Label>
                            <Input
                                id="dateTime"
                                type="datetime-local"
                                required
                                value={formData.dateTime}
                                onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
                                className="border-slate-200 focus-visible:ring-black"
                            />
                        </div>

                        {/* Início e Fim das Vendas */}
                        <div className="space-y-2">
                            <Label htmlFor="startingSales" className="font-bold text-xs uppercase">Início das Vendas</Label>
                            <Input
                                id="startingSales"
                                type="datetime-local"
                                required
                                value={formData.startingSales}
                                onChange={(e) => setFormData({...formData, startingSales: e.target.value})}
                                className="border-slate-200 focus-visible:ring-black"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="endingSales" className="font-bold text-xs uppercase">Fim das Vendas</Label>
                            <Input
                                id="endingSales"
                                type="datetime-local"
                                required
                                value={formData.endingSales}
                                onChange={(e) => setFormData({...formData, endingSales: e.target.value})}
                                className="border-slate-200 focus-visible:ring-black"
                            />
                        </div>

                        {/* Localização */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="location" className="font-bold text-xs uppercase">Localização</Label>
                            <Input
                                id="location"
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                placeholder="Ex: Belo Horizonte - Mineirão"
                                className="border-slate-200 focus-visible:ring-black"
                            />
                        </div>

                        <Button
                            disabled={loading}
                            type="submit"
                            className="col-span-2 bg-black text-white hover:bg-slate-800 font-bold h-12 uppercase tracking-widest mt-4"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {loading ? "Salvando..." : "Salvar Evento"}
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EventForm;