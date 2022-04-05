import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { BitacoraService } from '../../services/bitacora.service';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-bitacora',
  templateUrl: './nueva-bitacora.component.html',
  styleUrls: ['./nueva-bitacora.component.css']
})
export class NuevaBitacoraComponent implements OnInit {

  //*DECLARACION DE VARIABLES

  public fallaNombre: string;
  public idFalla: number;

  public idPuestos: number;
  public idUsuario: number;

  form: FormGroup;

  constructor(
    public modalService: ModalsService,
    public bitacoraService: BitacoraService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private cookie: CookieService,
  ) { }

  ngOnInit(): void {

    this.dataFalla();
    this.dataPuestos();
    this.checkId();

    this.form = this.fb.group({
      PuestosTrabajoID: ['', Validators.required,],
      FallaID: ['', Validators.required],
      Comentario: ['', Validators.required],
      Estado: 1
    })
  }

  createBitacora() {

    const data = {
      ...this.form.value,
      UsuarioID: this.idUsuario,
      FechaHora: new Date()
    }

    if (data) {
      this.bitacoraService.createBitacora(data).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Registro exitoso !!!',
          showConfirmButton: false,
          timer: 3000
        })
      }, (err) => {
        console.log(err)
      })
    }
  }

  dataFalla() {
    this.modalService.openFallas.pipe(
      delay(100)
    ).subscribe(data => {
      this.fallaNombre = data.nombreFalla;
      this.idFalla = data.fallaId;
      this.form.patchValue({ FallaID: this.idFalla });
    })
  }

  abrirModalFalla() {
    this.modalService.abrirModalFallas();
  }

  dataPuestos() {
    this.modalService.openPuestos.pipe(
      delay(100)
    ).subscribe(data => {
      this.idPuestos = data.puestosId;
      this.form.patchValue({ PuestosTrabajoID: this.idPuestos });
    })
  }

  abrirModalPuestos() {
    this.modalService.abrirModalPuestos();
  }

  //TODO FUNCIONAR PARA OBTENER ROL DE USUARIO LOGUA
  checkId() {
    try {

      const token = this.cookie.get('token');
      const tokenInfo = this.getDecodedAccessToken(token);
      this.idUsuario = tokenInfo.nameid;

    } catch (error) {
      return false
    }
  }

  //TODO FUNCION PARA DECODIFICAR JWT
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
