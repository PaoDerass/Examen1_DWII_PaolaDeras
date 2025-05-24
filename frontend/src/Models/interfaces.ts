
export interface Gasto {
    idgasto?: number;
    categoria: string;
    monto: number;
    fecha: string;
}


export interface Usuario {
    nombre: string;
    clave: string;
    autenticado: boolean;
}


export interface Presupuesto {
    monto: number;
    gastoActual: number;
}