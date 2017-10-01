import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Routes, RouterModule, ActivatedRoute, Router} from '@angular/router';
import { Subscription} from 'rxjs/Rx';
import {FormControl, NgForm} from '@angular/forms';
import {Message, SelectItem} from 'primeng/primeng';

import {Usuario} from '../classes/Usuario';
import {GerenciadorapiService} from '../gerenciadorapi.service';
import {Permissao} from '../classes/Permissao';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent implements OnInit, OnDestroy {

  public usuarios = new Array<Usuario>();
  private urlSubscrible: Subscription;
  public usuarioCadastrar = new Usuario();
  public usuarioSelecionado = new Usuario();
  private posicaoUsuarioSelecionado: number;
  private senhaUsuarioAtualizacao: string;
  public msgs: Message[] = [];

  public exibirTabela = true;
  public exibirDialog = false;

  @ViewChild('frmEditarUsuario') frmEditarUsuario: NgForm;
  @ViewChild('frmUsuario') frmUsuario: NgForm;

  public sltPermissoesCadastro = new Array<SelectItem>();
  public sltPermissoesAtualizar = new Array<SelectItem>();

  public idsPermissoesUsuarioSelecionado  = new Array<string>();
  private mapaPermissoes: Map<string, Permissao> = new Map<string, Permissao>();


  onRowSelect(event) {
    this.usuarioSelecionado = this.cloneUsuario(event.data);
    this.posicaoUsuarioSelecionado = this.usuarios.indexOf(this.usuarioSelecionado);
    this.senhaUsuarioAtualizacao = this.usuarioSelecionado.senha;
    this.idsPermissoesUsuarioSelecionado = new Array<string>();
    if (this.usuarioSelecionado.permissoes) {
      for (let i = 0; i < this.usuarioSelecionado.permissoes.length; i++) {
        this.idsPermissoesUsuarioSelecionado.push(this.usuarioSelecionado.permissoes[i].id);
      }
    }
    this.exibirDialog = true;
  }

  cloneUsuario(u: Usuario): Usuario {
    let usuario = new Usuario();
    for (let prop in u) {
      usuario[prop] = u[prop];
    }
    return usuario;
  }

  private atualizarTabela(): void {
    this.exibirTabela = false;
    setTimeout(() => this.exibirTabela = true, 0);
  }

  constructor(
    private _gerenciadorapiService: GerenciadorapiService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.urlSubscrible = this._activatedRoute.params.subscribe(() => {
      this.getLista();
    });
  }

  ngOnDestroy() {
    this.urlSubscrible.unsubscribe();
  }

  private montarMensagemRetorno(tipoMensagem: string, operacao: string, mensagem) {
    this.msgs.push({severity: tipoMensagem, summary: operacao, detail: mensagem});
    setTimeout(() => this.msgs = [], 5000);
  }

  private tratarErros(error: {erro}) {
    let mensagem: string;
    if ( error.erro === `Name ${this.usuarioCadastrar.nome} is already taken.`) {
      mensagem = 'Já existe um usuário cadastrado com esse nome';
    }else if (error.erro === 'O as informações enviadas do usuário não conferem com as informações armazenadas.') {
      mensagem = error.erro;
    }else {
      mensagem = 'Ocorreu um erro inesperado, por favor entre em contato com administrador do sistema.';
    }
    this.montarMensagemRetorno('error', 'Cadastro de usuários', mensagem);
  }

  public excluir() {
    this._gerenciadorapiService.excluir(this.usuarioSelecionado)
      .subscribe( response => {
        this.usuarios.splice(this.posicaoUsuarioSelecionado, 1);
        this.atualizarTabela();
        this.montarMensagemRetorno('success', 'Cadastro de usuários', 'Usuário excluido com sucesso.');
      },
        error => this.tratarErros(error));
    this.exibirDialog = false;
  }

  public cadastrar() {
    this._gerenciadorapiService.cadastrar(this.usuarioCadastrar)
      .subscribe(response => {
        this.frmUsuario.resetForm();
        this.usuarios.push(response);
        this.atualizarTabela();
        this.montarMensagemRetorno('success', 'Cadastro de usuários', 'Usuário cadastrado com sucesso.');
      },
          error => this.tratarErros(error));
  }

  public atualizar() {
    if (this.senhaUsuarioAtualizacao === this.usuarioSelecionado.senha) {
      this.usuarioSelecionado.senha = '';
      this.usuarioSelecionado.confirmaSenha = '';
    }
    if (!this.usuarioSelecionado.permissoes){
      this.usuarioSelecionado.permissoes = new Array<Permissao>();
    }
    this.usuarioSelecionado.permissoes.length = 0;
    for (let i = 0; i < this.idsPermissoesUsuarioSelecionado.length; i++) {
      this.usuarioSelecionado.permissoes.push(this.mapaPermissoes.get(this.idsPermissoesUsuarioSelecionado[i]));
    }
    this._gerenciadorapiService.atualizar(this.usuarioSelecionado)
      .subscribe( response => {
        response.senha = this.senhaUsuarioAtualizacao;
        response.confirmaSenha = this.senhaUsuarioAtualizacao;
        this.usuarios.splice(this.posicaoUsuarioSelecionado, 1, response);
        this.usuarios[this.posicaoUsuarioSelecionado] = this.usuarioSelecionado;
        this.atualizarTabela();
        this.montarMensagemRetorno('success', 'Cadastro de usuários', 'Usuário alterado com sucesso.');
        },
        error => this.tratarErros(error));
    this.exibirDialog = false;
    this.frmEditarUsuario.resetForm();
  }

  private getLista() {
    this._gerenciadorapiService.getLista()
      .subscribe(response => {
        this.usuarios = response.usuarios;
        let permissoes = new Array<Permissao>();
        permissoes = response.permissoes;
        for (let i = 0; i < permissoes.length; i++) {
          this.sltPermissoesCadastro.push({label: permissoes[i].nome, value: permissoes[i]});
          this.sltPermissoesAtualizar.push({label: permissoes[i].nome, value: permissoes[i].id});
          this.mapaPermissoes.set(permissoes[i].id, permissoes[i]);
        }
      });
  }

}
