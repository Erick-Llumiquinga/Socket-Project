import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearDocRoutingModule } from './crear-doc-routing.module';
import { CrearDocComponent } from './crear-doc.component';


@NgModule({
  declarations: [CrearDocComponent],
  imports: [
    CommonModule,
    CrearDocRoutingModule
  ]
})
export class CrearDocModule { }
