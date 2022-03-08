import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  //*DECLARACION DE VARIABLES
  form: FormGroup;
  errorSession: boolean;
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {

    //* VALIDACION DE FORMULARIO
    this.form = this.fb.group({
      Email: ['', Validators.required],
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
      console.log('Error de servidor' + err)
    })
  }
}
