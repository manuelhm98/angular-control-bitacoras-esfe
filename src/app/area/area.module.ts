import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import { ListaAreaComponent } from './components/lista-area/lista-area.component';
import { NuevaAreaComponent } from './components/nueva-area/nueva-area.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListaAreaComponent, NuevaAreaComponent],
  imports: [CommonModule, AreaRoutingModule, SharedModule],
})
export class AreaModule {}
