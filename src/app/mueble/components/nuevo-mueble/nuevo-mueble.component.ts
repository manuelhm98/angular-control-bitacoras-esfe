import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MuebleService } from '../../services/mueble.service';

@Component({
  selector: 'app-nuevo-mueble',
  templateUrl: './nuevo-mueble.component.html',
  styleUrls: ['./nuevo-mueble.component.css']
})
export class NuevoMuebleComponent implements OnInit {

  public mueble: any;
  public form: UntypedFormGroup;

  constructor(
    public muebleService: MuebleService,
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    //* PARAMS 
    this.activatedRoute.params.subscribe(({ id }) => this.loadMueble(id));
    //* VALIDACION DE FORMULARIO
    this.form = this.fb.group(({
      Codigo: ['', Validators.required],
      Estado: 1
    }))
  }

  loadMueble(id: number) {
    this.muebleService.byIdMueble(id).subscribe(data => {
      if (id === 0) {
        return;
      }

      this.mueble = data;
      this.form.patchValue({
        Codigo: this.mueble.Codigo,
        Estado: this.mueble.Estado
      })
    })
  }

  cerrarModal() {
    this.muebleService.cerrarModal();
    this.form.reset();
    return this.router.navigate(['/mueble'])
  }

  createMueble() {
    //Actualizar
    if (this.mueble) {
      const data = {
        ...this.form.value,
        MuebleID: this.mueble.MuebleID
      }
      this.muebleService.updateMueble(data).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'mUEBLE actualizado !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.muebleService.newEvent.emit(resp);
        this.form.reset();
        this.muebleService.loadMueble();
        this.muebleService.cerrarModal();
        return this.router.navigate(['/mueble'])
      })
    } else {
      if (this.form.invalid) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se permiten campos vacios',
          showConfirmButton: false,
          timer: 1000
        })
      }

      this.muebleService.createMueble(this.form.value).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Registro exitoso !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.muebleService.newEvent.emit(resp);
        this.form.reset();
        this.muebleService.loadMueble();
        this.muebleService.cerrarModal();
      }, (err) => {
        if (err.name === "HttpErrorResponse") {
          console.log(err)
          Swal.fire('Error', 'Servidor no disponible', 'error',)
        }
      })
    }
  }
}
