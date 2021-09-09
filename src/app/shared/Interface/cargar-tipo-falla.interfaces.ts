import { TipoFalla } from "src/app/tipo-falla/models/tipo-falla";


export interface cargarTipoFalla {
    TotalRegistros: number;
    TipoFallas: TipoFalla[];
}