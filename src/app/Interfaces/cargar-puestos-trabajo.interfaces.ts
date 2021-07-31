import { PuestosTrabajo } from "../puestos-trabajo/models/puestos-trabajo";

export interface cargarPuestosTrabajo {
    totalRegistros: number;
    PuestosTrabajo: PuestosTrabajo[];
}