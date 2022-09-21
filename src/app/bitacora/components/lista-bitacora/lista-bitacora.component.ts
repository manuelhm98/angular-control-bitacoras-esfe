import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Bitacora } from '../../models/bitacora';
import { BitacoraService } from '../../services/bitacora.service';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-lista-bitacora',
  templateUrl: './lista-bitacora.component.html',
  styleUrls: ['./lista-bitacora.component.css']
})
export class ListaBitacoraComponent implements OnInit {

  public totalBitacora: number = 0;
  public bitacoras: any[] = [];
  public page: number = 1;
  public take: number = 5;
  public start: string = "";

  constructor(public bitacoraService: BitacoraService) {
  }

  ngOnInit(): void {
    this.loadingBitacora();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.bitacoraService.newEvent.pipe().subscribe(resp => {
      this.loadingBitacora();
    })
  }


  deleteBitacoras
    (id: number) {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta a punto de eliminar un registro',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.bitacoraService.deleteBitacora(id)
          .subscribe(resp => {
            this.loadingBitacora();
            Swal.fire(
              'Mueble eliminado',
              `Mueble eliminado correctamente`,
              'success'
            )
          })
      }
    })

  }

  /**
   * This function is used to load the bitacoras from the database
   */
  loadingBitacora() {
    this.bitacoraService.listBitacora(this.start).subscribe(resp => {
      this.bitacoras = Object.values(resp)
    })
  }
  //* PAGINACION
  pageChangeEvent(event: number) {
    this.page = event;
    this.loadingBitacora();
  }


  abrirModal() {
    this.bitacoraService.abrirModal();
  }

  // downloadPDF() {
  //   // Extraemos el
  //   html2canvas(document.getElementById('htmlData')).then(canvas => {
  //     // Few necessary setting options

  //     const contentDataURL = canvas.toDataURL('image/png')
  //     let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  //     var width = pdf.internal.pageSize.getWidth();
  //     var height = canvas.height * width / canvas.width;
  //     pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
  //     pdf.save('output.pdf'); // Generated PDF
  //   });
  // }

  /**
   * It generates a pdf file with the data of the bitacoras.
   */

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
