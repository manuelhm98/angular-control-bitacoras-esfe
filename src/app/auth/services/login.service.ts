import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


//* URL API WEB
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //* Metodo log in
  sendCredentials(Email: string, Pass: string): Observable<any> {
    const body = {
      Email,
      Pass
    }
    return this.http.post(`${base_url}/usuario/login`, body)
    console.log(Email, Pass)
  }
}


