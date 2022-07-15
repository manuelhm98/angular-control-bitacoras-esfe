import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoArea } from 'src/app/tipo-area/models/tipo-area';
import { TipoAreaService } from 'src/app/tipo-area/services/tipo-area.service';
import { Usuario } from 'src/app/usuarios/models/usuario';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import Swal from 'sweetalert2';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-nueva-area',
  templateUrl: './nueva-area.component.html',
  styleUrls: ['./nueva-area.component.css']
})
export class NuevaAreaComponent implements OnInit {

  //* DECLARACION DE VARIABLES
  public tipoArea: TipoArea[] = [];
  public usuario: Usuario[] = [];
  public area: any;
  form: UntypedFormGroup;


  constructor(
    public areaService: AreaService,
    public tipoAreaService: TipoAreaService,
    private fb: UntypedFormBuilder,
    public usuarioService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarAreas(id));
    this.loadUsuarios();
    this.loadTipoAreas();

    //* VALIDACION DE FORMULARIO
    this.form = this.fb.group({
      UsuarioID: [Validators.required],
      TipoAreaID: ['', Validators.required],
      NombreArea: ['', Validators.required],
      Estado: 1
    })
  }
  createArea() {
    //Actualizar
    if (this.area) {
      const data = {
        ...this.form.value,
        AreaID: this.area.AreaID
      }
      this.areaService.updateArea(data).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Area  se actualizo exitosamente !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.areaService.newEvent.emit(resp);
        this.form.reset();
        this.areaService.loadArea();
        this.areaService.cerrarModal();
        return this.router.navigate(['/area'])
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

      this.areaService.createArea(this.form.value).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Registro exitoso !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.areaService.newEvent.emit(resp);
        this.areaService.loadArea();
        this.form.reset();
        this.areaService.cerrarModal();
        return this.router.navigate(['/area'])
      }, (err) => {
        if (err.name === "HttpErrorResponse") {
          console.log(err)
          Swal.fire('Error', 'Servidor no disponible', 'error',)
        }
      })
    }
  }

  loadTipoAreas() {
    this.tipoAreaService.listTipoAreas().subscribe(data => {
      this.tipoArea = data as TipoArea[];
    })
  }

  loadUsuarios() {
    this.usuarioService.listUsuarios().subscribe(data => {
      this.usuario = data as Usuario[]
    })
  }

  cargarAreas(id: number) {
    this.areaService.byIdArea(id).subscribe(data => {
      if (id === 0) {
        return;
      }
      this.area = data
      this.form.patchValue({
        UsuarioID: this.area.UsuarioID,
        TipoAreaID: this.area.TipoAreaID,
        NombreArea: this.area.NombreArea,
        Estado: this.area.Estado
      })
    })
  }

  cerrarModal() {
    this.areaService.cerrarModal();
    this.form.reset();
    return this.router.navigate(['/area'])
  }
}
