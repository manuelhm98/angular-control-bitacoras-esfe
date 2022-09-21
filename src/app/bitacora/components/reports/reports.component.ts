import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { BitacoraService } from '../../services/bitacora.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',

})
export class ReportsComponent implements OnInit {

  public bitacoras: any[] = []
  form: FormGroup
  public start: string = "";
  constructor(
    public bitacoraService: BitacoraService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadingBitacora()
    this.form = this.fb.group({
      dates: '',
    })
  }

  loadingBitacora() {
    this.bitacoraService.listBitacora(this.start).subscribe(resp => {
      this.bitacoras = Object.values(resp)
    })
  }

  searchBitacora(event: any) {
    // const result = this.bitacoras.filter(i => {
    //   i.FechaHora == this.form.controls['dates'].value
    // })
    console.log(event.target.value)
    this.start = event.target.value
    this.loadingBitacora()
  }

  generetePdf() {
    const array_object = []
    this.bitacoras.map((i) => {
      array_object.push(
        Object.values({
          area: i.PuestosTrabajo.Area.NombreArea,
          puestos: i.PuestosTrabajoID,
          usuario: i.Usuario.Nombre,
          fecha: i.FechaHora,
          comentario: i.Comentario
        })
      )
    })
    const docp = new jsPDF();
    docp.setFontSize(16);
    docp.text(`Reporte de bitacoras`, 10, 10);
    autoTable(docp, {
      startY: 50,
      head: [["Area", "# Puesto", "Usuario", "Fecha", "comentario"]],
      body: array_object,
    });
    docp.save(`reports.pdf`);
  }
}
