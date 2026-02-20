import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api.ts";
import {type EventInterface, EventTypeLabels } from "@/types/events.ts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Plus,
    Calendar,
    MapPin,
    Pencil
} from "lucide-react";

// Configuração visual baseada no tipo técnico
const eventTypeVisual: Record<string, { emoji: string; color: string }> = {
    PALESTRA: { emoji: "🎤", color: "bg-blue-100 text-blue-700" },
    SHOW: { emoji: "🎸", color: "bg-purple-100 text-purple-700" },
    TEATRO: { emoji: "🎭", color: "bg-red-100 text-red-700" },
    CURSO: { emoji: "📚", color: "bg-green-100 text-green-700" },
    GERAL: { emoji: "🎟️", color: "bg-slate-100 text-slate-700" },
};

const ListEvents = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<EventInterface[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        api.get("/sales/events")
            .then((response) => setEvents(response.data))
            .catch((err) => console.error("Erro ao carregar eventos:", err));
    }, []);

    const filteredEvents = events.filter((event) =>
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 max-w-[1600px] mx-auto space-y-8 bg-white font-sans">

            {/* Cabeçalho */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-4 border-black pl-4">
                <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Programação</h3>
                    <h1 className="text-2xl font-bold tracking-tight text-black">Eventos Disponíveis</h1>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar evento..."
                            className="pl-10 border-slate-200 focus-visible:ring-black"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={() => navigate("/events/new")}
                        className="bg-black text-white hover:bg-slate-800 font-bold gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Cadastrar Evento
                    </Button>
                </div>
            </div>

            {/* Grid de Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEvents.map((event) => {
                    const visual = eventTypeVisual[event.type] || eventTypeVisual.GERAL;
                    const label = EventTypeLabels[event.type] || "Geral";

                    return (
                        <Card key={event.id} className="relative overflow-hidden border-2 border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl flex flex-col">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-black" />

                            <CardContent className="pt-6 flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-3xl">{visual.emoji}</span>
                                    <Badge variant="secondary" className={`text-[10px] font-bold uppercase ${visual.color}`}>
                                        {label}
                                    </Badge>
                                </div>

                                <h2 className="text-lg font-bold text-black mb-2 uppercase leading-tight line-clamp-2">
                                    {event.description}
                                </h2>

                                <div className="space-y-2 mt-4 text-slate-500 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-black" />
                                        <span className="font-medium">{new Date(event.dateTime).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-black" />
                                        <span className="font-medium italic line-clamp-1">{event.location}</span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Preço</p>
                                    <p className="text-2xl font-black text-black">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(event.price)}
                                    </p>
                                </div>
                            </CardContent>

                            <CardFooter className="bg-slate-50/50 p-4 border-t border-slate-100 gap-2">
                                <Button className="flex-1 bg-black text-white hover:bg-slate-800 font-bold text-xs uppercase" onClick={() => navigate(`/sales/new`)}>
                                    Vender Ingresso
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-slate-200 hover:bg-black hover:text-white"
                                    onClick={() => navigate(`/events/edit/${event.id}`)}
                                >
                                    <Pencil className="w-4 h-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default ListEvents;