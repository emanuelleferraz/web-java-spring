import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api.ts";
import type { UserInterface } from "@/types/users.ts";
import { Input } from "@/components/ui/input";
import { Search, Pencil, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ListUsers = () => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);
    const [adminPassword, setAdminPassword] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        api.get("/users").then((response) => {
            setUsers(response.data);
        }).catch(err => console.error("Erro ao carregar usuários:", err));
    };

    const confirmDelete = async () => {
        if (!userToDelete || !adminPassword) return;

        setIsDeleting(true);
        try {
            await api.delete("/users", {
                data: {
                    id: userToDelete,
                    password: adminPassword
                }
            });

            setUsers(prev => prev.filter(u => u.id !== userToDelete));
            setIsDeleteDialogOpen(false);
            setAdminPassword("");
            setUserToDelete(null);
            alert("Usuário removido com sucesso!");
        } catch (error: any) {
            console.error("Erro na exclusão:", error.response?.data);
            alert("Falha ao remover usuário. Verifique a senha.");
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 max-w-[1600px] mx-auto space-y-8 bg-white font-sans">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-black">Usuários</h1>
                    <p className="text-sm text-muted-foreground">
                        Gerencie e visualize todos os usuários cadastrados.
                    </p>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Filtrar usuários..."
                        className="pl-10 border-slate-200 focus-visible:ring-1 focus-visible:ring-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-md border border-slate-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-black hover:bg-black">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="w-[80px] font-bold text-white h-10 px-6 text-[12px] uppercase tracking-wider">
                                ID
                            </TableHead>
                            <TableHead className="font-bold text-white h-10 text-[12px] uppercase tracking-wider">
                                Nome
                            </TableHead>
                            <TableHead className="font-bold text-white h-10 text-[12px] uppercase tracking-wider">
                                E-mail
                            </TableHead>
                            <TableHead className="text-right font-bold text-white h-10 px-6 text-[12px] uppercase tracking-wider">
                                Ações
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <TableRow key={user.id} className="group transition-colors border-b border-slate-100 last:border-0">
                                    <TableCell className="font-mono text-[10px] text-slate-400 px-6 py-3 italic">
                                        #{user.id.toString().slice(-5)}
                                    </TableCell>
                                    <TableCell className="text-[13px] font-semibold text-slate-900 py-3">
                                        {user.name}
                                    </TableCell>
                                    <TableCell className="text-[13px] text-slate-600 py-3">
                                        {user.email}
                                    </TableCell>
                                    <TableCell className="text-right px-6 py-3">
                                        <div className="flex justify-end gap-4">
                                            <button
                                                onClick={() => navigate(`/users/edit/${user.id}`)}
                                                className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-black transition-colors"
                                            >
                                                <Pencil className="w-3 h-3" />
                                                EDITAR
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setUserToDelete(user.id);
                                                    setIsDeleteDialogOpen(true);
                                                }}
                                                className="flex items-center gap-1 text-[11px] font-bold text-red-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                                EXCLUIR
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground text-sm">
                                    Nenhum usuário encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                            <Trash2 className="w-5 h-5" /> Confirmar Exclusão
                        </DialogTitle>
                        <DialogDescription>
                            Esta ação não pode ser desfeita. Digite sua senha de administrador para confirmar.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="pass">Sua Senha</Label>
                            <Input
                                id="pass"
                                type="password"
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                placeholder="******"
                                className="focus-visible:ring-red-500"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsDeleteDialogOpen(false);
                                setAdminPassword("");
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={isDeleting || !adminPassword}
                        >
                            {isDeleting ? "Excluindo..." : "Confirmar Exclusão"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <p className="text-[11px] font-medium text-slate-400 px-1 italic">
                Mostrando {filteredUsers.length} registros no total.
            </p>
        </div>
    );
};

export default ListUsers;