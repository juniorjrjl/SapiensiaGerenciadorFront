import {Permissao} from './Permissao';

export class Usuario {

  public id: string;
  public nome: string;
  public email: string;
  public senha: string;
  public confirmaSenha: string;
  public permissoes = new Array<Permissao>();

}
