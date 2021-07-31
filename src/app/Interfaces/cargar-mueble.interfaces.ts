import { Mueble } from "../mueble/models/mueble";

export interface cargarMueble {
    totalRegistros: number;
    Mueble: Mueble[];
}