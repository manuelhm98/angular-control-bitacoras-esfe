import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  //*DECLARACION DE VARIABLES
  form: UntypedFormGroup;
  errorSession: boolean;
  constructor(
    private loginService: LoginService,
    private fb: UntypedFormBuilder,
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {

    //* VALIDACION DE FORMULARIO
    this.form = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Pass: ['', Validators.required],
    })
  }

  //* ENVIO DE EMAIL AND PASSWORD
  login(): void {
    const { Email, Pass } = this.form.value
    this.loginService.sendCredentials(Email, Pass).subscribe(resp => {
      if (resp.Exito == 1) {
        console.log('Sesion iniciada')
        const { Data } = resp;
        this.cookie.set('token', Data.Token, 1, '/')
        this.errorSession = false;
        return this.router.navigate(['/'])
      } else {
        this.errorSession = true;
        console.log('Email o password invalidos')
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Servidor no disponible',
        showConfirmButton: false,
        timer: 2000
      })
      console.log(err)
    })
  }
}
