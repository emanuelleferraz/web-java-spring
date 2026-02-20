import type {EventInterface} from "./events";

export type EnumSaleStatus = "EM_ABERTO" | "PAGO" | "CANCELADO" | "ESTORNADO";

export interface SaleInterface {
    id: string;
    userId: string;
    event: EventInterface;
    dateTime: string;
    status: EnumSaleStatus;
    createdAt?: string;
    updatedAt?: string;
}

export const SaleStatusLabels: Record<EnumSaleStatus, string> = {
    EM_ABERTO: "Em aberto",
    PAGO: "Pago",
    CANCELADO: "Cancelado",
    ESTORNADO: "Estornado",
};

export const SaleStatusColors: Record<EnumSaleStatus, string> = {
    EM_ABERTO: "bg-blue-100 text-blue-700 border-blue-200",
    PAGO: "bg-green-100 text-green-700 border-green-200",
    CANCELADO: "bg-red-100 text-red-700 border-red-200",
    ESTORNADO: "bg-orange-100 text-orange-700 border-orange-200",
};