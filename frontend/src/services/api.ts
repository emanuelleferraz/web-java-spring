import axios from "axios";

// O SERVER aponta para o seu Spring Cloud Gateway
const SERVER = "http://localhost:8080";

const api = axios.create({
    baseURL: SERVER,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * api_fetch: Uma alternativa nativa ao axios caso precise
 * em contextos específicos (como Server Components se usar Next.js)
 */
const api_fetch = async (endpoint: string, config?: RequestInit) => {
    const response = await fetch(`${SERVER}${endpoint}`, {
        ...config,
        headers: {
            "Content-Type": "application/json",
            ...config?.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Erro na requisição");
    }

    return await response.json();
};

export default api;
export { api_fetch };