import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {FormUsuariosComponent} from './form-usuarios/form-usuarios.component';
import {FormLoginComponent} from './form-login/form-login.component';
const GERENCIADOR_ROUTES: Routes = [
  {path: '', component: FormLoginComponent},
  {path: 'gerenciar', component: FormUsuariosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(GERENCIADOR_ROUTES)],
  exports: [RouterModule]
})

export class GerenciadorRoutingModule {}
