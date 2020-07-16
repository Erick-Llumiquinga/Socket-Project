import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioNuevoModule } from './usuario-nuevo.module';


const routes: Routes = [
  {path: 'usuario-nuevo', component: Usuar}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioNuevoRoutingModule { }
