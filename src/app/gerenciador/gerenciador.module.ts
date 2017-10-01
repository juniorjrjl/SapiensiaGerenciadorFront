import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import {FormUsuariosComponent} from './form-usuarios/form-usuarios.component';
import {GerenciadorapiService} from './gerenciadorapi.service';
import {
  DialogModule, FieldsetModule, GrowlModule, MessagesModule, PanelModule, SelectButtonModule,
  TabViewModule
} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {DataTableModule, SharedModule} from 'primeng/primeng';

import {GerenciadorRoutingModule} from './gerenciador.routing.module';
import { FormLoginComponent } from './form-login/form-login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FieldsetModule,
    PasswordModule,
    ButtonModule,
    DataTableModule,
    SharedModule,
    GerenciadorRoutingModule,
    DialogModule,
    GrowlModule,
    TabViewModule,
    SelectButtonModule,
    PanelModule,
    MessagesModule
  ],
  exports: [
    FormUsuariosComponent,
    FormLoginComponent
  ],
  declarations: [
    FormUsuariosComponent,
    FormLoginComponent,
    FormLoginComponent
  ],
  providers: [
    GerenciadorapiService
  ]
})
export class GerenciadorModule { }
