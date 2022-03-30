import { Component, OnInit } from '@angular/core';
import { ModalsService } from './services/modals.service';
import { SidebarService } from './services/sidebar.service';

/********INILIZACION DE SCRIPT DE FORMA GLOBAL*********/
declare function toggle();


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(
    public modalService: ModalsService,
    public sidebarService: SidebarService
  ) { }

  ngOnInit(): void {

  }

}
