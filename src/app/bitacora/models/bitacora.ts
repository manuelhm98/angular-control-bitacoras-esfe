import { PuestosTrabajo } from '../../puestos-trabajo/models/puestos-trabajo';
export class Bitacora {
  BitacoraID: number;
  PuestosTrabajoID: number;
  UsuarioID: number;
  FallaID: number;
  FechaHora: Date;
  Comentario: string;
  Estado: string;
}

export interface BitacoraPdf {
  BitacoraID: number;
  PuestosTrabajo: PuestosTrabajo[];
  UsuarioID: number;
  FallaID: number;
  FechaHora: Date;
  Comentario: string;
  Estado: string;
}