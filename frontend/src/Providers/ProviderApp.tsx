'use client'
import React, { useState, useEffect } from 'react'
import { ContextoApp } from '../Context/ContextApp'
import {Plantilla} from '../Models/Plantilla'
import { Usuario, Presupuesto, Gasto } from '../Models/interfaces'

export default function ProviderApp({ children }: Plantilla) {
    const [usuario, setUsuario] = useState(new Usuario());
    const [presupuesto, setPresupuesto] = useState(new Presupuesto());
    const [gastos, setGastos] = useState<Gasto[]>([]);
    
    const [alerta, setAlerta] = useState({
        tipo: '' as 'warning' | 'danger' | '',
        mensaje: ''
    });

    function iniciarSesion(nombre: string, clave: string): boolean {
        if (nombre === 'admin' && clave === 'admin123') {
            setUsuario(new Usuario('admin', 'admin123', true));
            return true;
        }
        return false;
    }

    function cerrarSesion() {
        setUsuario(new Usuario());
    }


    function establecerPresupuesto(monto: number) {
        setPresupuesto(new Presupuesto(monto, presupuesto.gastoActual));
    }


    async function agregarGasto(gastoData: any) {
        try {
            const respuesta = await fetch('http://localhost:5000/gasto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gastoData)
            });

            if (respuesta.ok) {
                await cargarGastos(); 
            }
        } catch (error) {
            console.error('Error al agregar gasto:', error);
        }
    }


    async function cargarGastos() {
        try {
            const respuesta = await fetch('http://localhost:5000/gasto');
            const datos = await respuesta.json();
            setGastos(datos);
            
   
            const totalGastos = datos.reduce((suma: number, gasto: any) => suma + parseFloat(gasto.monto), 0);
            setPresupuesto(prev => ({
                ...prev,
                gastoActual: totalGastos
            }));
        } catch (error) {
            console.error('Error al cargar los gastos:', error);
        }
    }

    useEffect(() => {
        if (presupuesto.monto > 0) {
            const porcentaje = (presupuesto.gastoActual / presupuesto.monto) * 100;
            
            if (porcentaje >= 100) {
                setAlerta({
                    tipo: 'danger',
                    mensaje: 'Has superado el limite del presupuesto debes ajustar los gastos'
                });
            } else if (porcentaje >= 80) {
                setAlerta({
                    tipo: 'warning',
                    mensaje: 'Has alcanzado el 80% de tu presupuesto'
                });
            } else {
                setAlerta({
                    tipo: '',
                    mensaje: ''
                });
            }
        }
    }, [presupuesto]);

    const valorContexto = {
        usuario,
        iniciarSesion,
        cerrarSesion,
        presupuesto,
        establecerPresupuesto,
        gastos,
        agregarGasto,
        cargarGastos,
        alerta
    };

    return (
        <ContextoApp.Provider value={valorContexto}>
            {children}
        </ContextoApp.Provider>
    );
}