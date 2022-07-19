import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { listCount } from '../Interface/listCount.interfaces';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  //* LIST PAGING Count
  data() {
    const url = `${base_url}/puestostrabajo/count`;
    return this.http.get<listCount[]>(url);
  }


}
