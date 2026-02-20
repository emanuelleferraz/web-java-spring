import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, CheckCircle2, Loader2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const [formData, setFormData] = useState({
        id: id,
        name: "",
        email: ""
    });

    useEffect(() => {
        if (id) {
            api.get(`/users/${id}`).then((res) => {
                setFormData({
                    id: res.data.id,
                    name: res.data.name,
                    email: res.data.email
                });
            });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put("/users", {
                id: formData.id,
                name: formData.name
            });
            setIsSuccessOpen(true); // Abre o modal bonitão em vez do alert
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-xl mx-auto space-y-6">
            <Button variant="ghost" onClick={() => navigate("/users")} className="gap-2 hover:bg-slate-100">
                <ArrowLeft className="w-4 h-4" /> Voltar para Lista
            </Button>

            <Card className="shadow-xl border-t-4 border-t-black">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" /> Editar Usuário
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid gap-2">
                            <Label className="text-slate-500 italic text-[12px]">ID do Usuário</Label>
                            <Input value={formData.id} disabled className="bg-slate-50 font-mono text-xs" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">E-mail (Não editável)</Label>
                            <Input id="email" value={formData.email} disabled className="bg-slate-50 opacity-70" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                required
                                placeholder="Digite o novo nome"
                                className="border-slate-300 focus-visible:ring-black"
                            />
                        </div>

                        <Button type="submit" className="w-full bg-black text-white hover:bg-slate-800 transition-colors" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Atualizando...
                                </>
                            ) : (
                                "Atualizar Cadastro"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* MODAL DE SUCESSO */}
            <AlertDialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
                <AlertDialogContent className="flex flex-col items-center text-center p-10">
                    <div className="bg-green-100 p-3 rounded-full mb-4">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl text-center align-middle">Sucesso!</AlertDialogTitle>
                        <AlertDialogDescription className="text-base text-center">
                            Os dados de <strong>{formData.name}</strong> foram atualizados no sistema com êxito.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6 w-full">
                        <AlertDialogAction
                            className="bg-black text-white w-full"
                            onClick={() => navigate("/users")}
                        >
                            Voltar para a Lista
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}