import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoFalla } from 'src/app/tipo-falla/models/tipo-falla';
import { TipoFallaService } from 'src/app/tipo-falla/services/tipo-falla.service';
import Swal from 'sweetalert2';
import { Falla } from '../../models/falla';
import { FallaService } from '../../services/falla.service';

@Component({
  selector: 'app-nueva-falla',
  templateUrl: './nueva-falla.component.html',
  styleUrls: ['./nueva-falla.component.css']
})
export class NuevaFallaComponent implements OnInit {

  //* DECLARACION DE VARIABLES 
  public tipoFalla: TipoFalla[] = [];
  public falla: any;
  form: UntypedFormGroup

  constructor(
    public fallaService: FallaService,
    private tipoFallaService: TipoFallaService,
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarFalla(id));
    this.loadTipoFalla();
    this.form = this.fb.group({
      TipoFallaID: [Validators.required],
      Descripcion: ['', Validators.required],
      Estado: 1
    })
  }

  loadTipoFalla() {
    this.tipoFallaService.listTipoFallas().subscribe(data => {
      this.tipoFalla = data as TipoFalla[];
    })
  }

  cargarFalla(id: number) {
    this.fallaService.byIdFalla(id).subscribe(data => {

      if (id === 0) {
        return;
      }
      this.falla = data

      this.form.patchValue({
        TipoFallaID: this.falla.TipoFallaID,
        Descripcion: this.falla.Descripcion,
        Estado: this.falla.Estado
      })
    })
  }

  createFalla() {
    //Actualizar
    if (this.falla) {
      const data = {
        ...this.form.value,
        FallaID: this.falla.FallaID
      }
      this.fallaService.editFalla(data).subscribe(resp => {
        this.fallaService.cerrarModal();
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Falla  se actualizo exitosamente !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.fallaService.newEvent.emit(resp);
        this.form.reset();
        this.fallaService.loadingFalla();
        return this.router.navigate(['/falla'])
      }, (e) => {
        this.fallaService.cerrarModal();
        return Swal.fire('Error', 'Ah ocurrido un error inesperado', 'error',)
      })

    } else {
      this.fallaService.createFalla(this.form.value).subscribe(resp => {
        this.fallaService.cerrarModal();
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Registro exitoso !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.fallaService.newEvent.emit(resp);
        this.fallaService.loadingFalla();
        this.form.reset();
        return this.router.navigate(['/falla'])
      }, (err) => {
        this.fallaService.cerrarModal();
        return Swal.fire('Error', 'Ah ocurrido un error inesperado', 'error',)
      })
    }
  }

  cerrarModal() {
    this.fallaService.cerrarModal();
    this.form.reset();
    return this.router.navigate(['/falla'])
  }

}
