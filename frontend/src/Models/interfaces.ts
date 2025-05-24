
export class Gasto {
    idgasto?: number;
    categoria: string;
    monto: number;
    fecha: string;

    constructor(categoria: string = '', monto: number = 0, fecha: string = '', idgasto?: number) {
        this.idgasto = idgasto;
        this.categoria = categoria;
        this.monto = monto;
        this.fecha = fecha;
    }
}


export class Usuario {
    nombre: string;
    clave: string;
    autenticado: boolean;

    constructor(nombre: string = '', clave: string = '', autenticado: boolean = false) {
        this.nombre = nombre;
        this.clave = clave;
        this.autenticado = autenticado;
    }
}


export class Presupuesto {
    monto: number;
    gastoActual: number;

    constructor(monto: number = 0, gastoActual: number = 0) {
        this.monto = monto;
        this.gastoActual = gastoActual;
    }
}


export const categorias: string[] = [
    'Comida',
    'Transporte', 
    'Entretenimiento',
    'Ropa',
    'Salud',
    'Educación',
    'Otros'
];