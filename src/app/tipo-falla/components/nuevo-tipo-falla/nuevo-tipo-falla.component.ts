import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoFallaService } from '../../services/tipo-falla.service';

@Component({
  selector: 'app-nuevo-tipo-falla',
  templateUrl: './nuevo-tipo-falla.component.html',
  styleUrls: ['./nuevo-tipo-falla.component.css']
})
export class NuevoTipoFallaComponent implements OnInit {

  //* DECLARACION DE VARIABLES 
  public tipoFalla: any;
  form: FormGroup

  constructor(
    public tipoFallaService: TipoFallaService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarTipoFalla(id));
    //!* VALIDACION DE FORMULARIO
    this.form = this.fb.group({
      Tipo: ['', Validators.required],
      Estado: 1
    })
  }

  cerrarModal() {
    this.tipoFallaService.cerrarModal();
    this.form.reset();
    return this.router.navigate(['/tipo-falla'])
  }

  registerTipoFalla() {
    //* ACTUALIZAR 
    if (this.tipoFalla) {
      const data = {
        ...this.form.value,
        TipoFallaID: this.tipoFalla.TipoFallaID
      }
      this.tipoFallaService.updateTipoFalla(data).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Tipo Falla  se actualizo exitosamente !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.tipoFallaService.newEvent.emit(resp);
        this.form.reset();
        this.tipoFallaService.loadTipoFalla();
        this.tipoFallaService.cerrarModal();
        return this.router.navigate(['/tipo-falla'])
      })
      //* GUARDAR
    } else {
      this.tipoFallaService.createTipoFalla(this.form.value).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Registro exitoso !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.tipoFallaService.newEvent.emit(resp);
        this.tipoFallaService.loadTipoFalla();
        this.form.reset();
        this.tipoFallaService.cerrarModal();
        return this.router.navigate(['/tipo-falla'])
      }, (err) => {
        if (err.name === "HttpErrorResponse") {
          console.log(err)
          Swal.fire('Error', 'Servidor no disponible', 'error',)
        }
      })
    }

  }

  cargarTipoFalla(id: number) {
    this.tipoFallaService.byIdTipoFalla(id).subscribe(data => {
      if (id === 0) {
        return;
      }
      this.tipoFalla = data
      this.form.patchValue({
        TipoFallaID: this.tipoFalla.TipoFallaID,
        Tipo: this.tipoFalla.Tipo,
        Estado: this.tipoFalla.Estado
      })
    })
  }

}
