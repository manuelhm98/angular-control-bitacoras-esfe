import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoArea } from '../../models/tipo-area';
import { TipoAreaService } from '../../services/tipo-area.service';

@Component({
  selector: 'app-nuevo-tipo-area',
  templateUrl: './nuevo-tipo-area.component.html',
  styleUrls: ['./nuevo-tipo-area.component.css']
})
export class NuevoTipoAreaComponent implements OnInit {

  //* DECLARACION DE VARIABLES 
  public tipoArea: any;
  form: UntypedFormGroup

  constructor(
    public tipoAreaService: TipoAreaService,
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarTipoArea(id));
    /****VALIDACION DE FORMULARIO*****/
    this.form = this.fb.group({
      Tipo: ['', Validators.required],
      Estado: 1
    })
  }

  cerrarModal() {
    this.tipoAreaService.cerrarModal();
    this.form.reset();
    return this.router.navigate(['/tipo-area'])
  }

  registerTipoArea() {
    //* ACTUALIZAR 
    if (this.tipoArea) {
      const data = {
        ...this.form.value,
        TipoAreaID: this.tipoArea.TipoAreaID
      }
      this.tipoAreaService.updateTipoArea(data).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Tipo Area  se actualizo exitosamente !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.tipoAreaService.newEvent.emit(resp);
        this.form.reset();
        this.tipoAreaService.loadTipoAreas();
        this.tipoAreaService.cerrarModal();
        return this.router.navigate(['/tipo-area'])
      })
    } else {
      this.tipoAreaService.createTipoArea(this.form.value).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Registro exitoso !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.tipoAreaService.newEvent.emit(resp);
        this.tipoAreaService.loadTipoAreas();
        this.form.reset();
        this.tipoAreaService.cerrarModal();
        return this.router.navigate(['/tipo-area'])
      }, (err) => {
        if (err.name === "HttpErrorResponse") {
          console.log(err)
          Swal.fire('Error', 'Servidor no disponible', 'error',)
        }
      })
    }

  }

  cargarTipoArea(id: number) {
    this.tipoAreaService.byIdTipoAreas(id).subscribe(data => {
      if (id === 0) {
        return;
      }
      this.tipoArea = data
      this.form.patchValue({
        TipoAreaID: this.tipoArea.TipoAreaID,
        Tipo: this.tipoArea.Tipo,
        Estado: this.tipoArea.Estado
      })
    })
  }

}
