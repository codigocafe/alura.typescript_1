import { Negociacao } from "./negociacao.js";

export class Negociacoes {
  private negociacoes: Array<Negociacao> = [];

  adicionar(negociacao: Negociacao){
    this.negociacoes.push(negociacao);
  }

  listar(): Array<Negociacao>{
    return this.negociacoes;
  }
}