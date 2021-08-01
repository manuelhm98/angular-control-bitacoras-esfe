import { TipoFalla } from "src/app/tipo-falla/models/tipo-falla";


export interface cargarTipoFalla {
    totalRegistros: number;
    TipoFalla: TipoFalla[];
}