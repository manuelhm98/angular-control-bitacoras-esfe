import { Component } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { listCount } from '../../Interface/listCount.interfaces';
import { DashboardService } from '../../services/dashboard.service';

interface Data {
  name: string;
  value: number;
}

let json = {

}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {

  data: any[]

  view: [number, number] = [800, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  constructor(public dashboardService: DashboardService) {

  }



  ngOnInit(): void {
    this.loadCount();


  }

  loadCount() {
    this.dashboardService.data().subscribe(resp => {
      // console.log(resp)
      json = resp
      console.log(json)

      of(json) // crear un observable que emita el el json
        .pipe(
          map(json => {
            // arreglo para guardar los objetos transformados
            let mocks: Data[] = [];
            // iterar las keys del objeto
            Object.keys(json).forEach(k => {
              // insertar el nuevo objeto
              mocks.push({
                name: k,
                value: json[k]
              });
            });
            this.data = mocks
            return mocks;
          })
        )
        .subscribe(res => console.log(res));
    })
  }

  // single() {
  //   return JSON.stringify(this.data)
  // }


  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  public resizeChart(width: any): void {
    this.view = [width, 320]
  }

}
