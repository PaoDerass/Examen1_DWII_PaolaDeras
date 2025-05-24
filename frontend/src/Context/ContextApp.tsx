'use client'
import React, { createContext, useContext } from 'react'

interface ContextoAppTipo {
    usuario: {
        nombre: string;
        autenticado: boolean;
    };
    iniciarSesion: (nombre: string, clave: string) => boolean;
    cerrarSesion: () => void;
    
    presupuesto: {
        monto: number;
        gastoActual: number;
    };
    establecerPresupuesto: (monto: number) => void;
    

    gastos: any[];
    agregarGasto: (gasto: any) => Promise<void>;
    cargarGastos: () => Promise<void>;
    

    alerta: {
        tipo: 'warning' | 'danger' | '';
        mensaje: string;
    };
}

export const ContextoApp = createContext<ContextoAppTipo | undefined>(undefined);

export function useApp() {
    const contexto = useContext(ContextoApp);
    if (!contexto) {
        throw new Error('useApp debe ser usado dentro de ProviderApp');
    }
    return contexto;
}