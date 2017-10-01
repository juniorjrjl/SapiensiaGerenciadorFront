import {Component, OnDestroy, OnInit} from '@angular/core';
import {Usuario} from '../classes/Usuario';
import {Subscription} from 'rxjs/Subscription';
import {GerenciadorapiService} from '../gerenciadorapi.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit, OnDestroy  {

  public usuario: Usuario = new Usuario();
  private urlSubscrible: Subscription;
  public informativo: Message[] = [];
  constructor(
    private _gerenciadorapiService: GerenciadorapiService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.urlSubscrible = this._activatedRoute.params.subscribe(() => {});
  }

  ngOnDestroy() {
    this.urlSubscrible.unsubscribe();
  }

  public logar() {
    let mensagem = '';
    this._gerenciadorapiService.getToken(this.usuario)
      .subscribe( response => {
          this._router.navigateByUrl('../gerenciar');
      },
        error => {
        mensagem = (error.error_description) ? error.error_description : '';
        this.informativo = [];
        this.informativo.push({severity: 'error', summary: 'Erro ao realizar login', detail: mensagem});
      });
  }
}
