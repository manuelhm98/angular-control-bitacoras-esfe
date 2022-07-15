import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BitacoraService } from '../../services/bitacora.service';

@Component({
  selector: 'app-detalle-bitacora',
  templateUrl: './detalle-bitacora.component.html',
  styleUrls: ['./detalle-bitacora.component.css']
})
export class DetalleBitacoraComponent implements OnInit {

  public bitacora: any;

  constructor(
    public bitacoraService: BitacoraService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarBitacora(id));
  }

  /**
   * This function is used to load the data of the selected bitacora in the form
   * @param {number} id - number
   */
  cargarBitacora(id: number) {
    this.bitacoraService.byIdBitacora(id).subscribe(data => {
      if (id === 0) {
        return;
      }
      this.bitacora = data;
    })
  }

  cerrarModal() {
    this.bitacoraService.cerrarModal();
    return this.router.navigate(['/bitacora'])
  }
}
