import { Injectable } from '@angular/core';

import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Usuario} from './classes/Usuario';
import {getResponseURL} from '@angular/http/src/http_utils';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GerenciadorapiService {

  private readonly dominio = 'http://localhost:57623/';

  private readonly url = 'api/Usuarios';

  constructor(private _http: Http) { }

  getToken(usuario: Usuario) {
    const _headers = new Headers({'Content-Type': 'x-www-form-urlencoded'});
    const _body = `username=${usuario.nome}&password=${usuario.senha}&grant_type=password`;
    return this._http.post(this.dominio + 'token', _body, _headers)
      .map(response => response.json())
      .catch((err: any) => Observable.throw(JSON.parse(err._body)));
  }

  getLista() {
    return this._http.get(`${this.dominio + this.url}`)
      .map(response  => response.json());
  }

  cadastrar (usuario: Usuario) {
    return this._http.post(`${this.dominio + this.url}`, usuario)
      .map(response => response.json())
      .catch((err: any) => Observable.throw(JSON.parse(err._body)));
  }

  atualizar (usuario: Usuario) {
    return this._http.put(`${this.dominio + this.url}`, usuario)
      .map(response => response.json())
      .catch((err: any) => Observable.throw(JSON.parse(err._body)));
  }

  excluir(usuario: Usuario) {
    const _body = JSON.stringify(usuario);
    const _headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({
      headers: _headers,
      body : _body
    });
    return this._http.delete( `${this.dominio + this.url}`, options)
      .map(response => response)
      .catch((err: any) => Observable.throw(JSON.parse(err._body)));
  }

}
