import { PuestosTrabajo } from "src/app/puestos-trabajo/models/puestos-trabajo";


export interface cargarPuestosTrabajo {
    totalRegistros: number;
    PuestosTrabajo: PuestosTrabajo[];
}