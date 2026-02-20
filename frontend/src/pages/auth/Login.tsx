import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // Estado para o erro
    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null); // Limpa erro anterior

        try {
            const response = await api.post("/users/login", { email, password });
            localStorage.setItem("@EventPass:user", JSON.stringify(response.data));

            // Agora redireciona para a home/dashboard que tem o Header
            navigate("/home");
        } catch (error) {
            setError("Email ou senha inválidos. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 px-4">
            <div className="mb-6 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight">🎟️ EventPass</h1>
                <p className="text-muted-foreground mt-2">Sistema Administrativo de Vendas</p>
            </div>

            <Card className="w-full max-w-sm shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-center">Acessar Conta</CardTitle>
                    <CardDescription className="text-center">Informe seu email e senha</CardDescription>
                </CardHeader>

                <form onSubmit={handleLogin}>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@email.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Mensagem de erro */}
                        {error && (
                            <p className="text-destructive text-sm font-medium mt-4 text-center">
                                {error}
                            </p>
                        )}
                    </CardContent>


                    <CardFooter className="flex flex-col gap-3 pt-2">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Carregando..." : "Entrar"}
                        </Button>
                        <Button variant="link" className="text-sm" type="button">
                            Esqueceu sua senha?
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}