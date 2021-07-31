import { TipoFalla } from "../tipo-falla/models/tipo-falla";

export interface cargarTipoFalla {
    totalRegistros: number;
    TipoFalla: TipoFalla[];
}