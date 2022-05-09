import { Negociacao } from "../models/negociacao.js";

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;

  constructor(){
    this.inputData = document.querySelector('#data');
    this.inputQuantidade = document.querySelector("#quantidade");
    this.inputValor = document.querySelector('#valor');
  }

  criarNegociacao(): Negociacao {
    const exp = /-/g;
    const date = new Date(this.inputData.value.replace(exp, ','));
    const quantidade = parseInt(this.inputQuantidade.value);
    const valor = parseFloat(this.inputValor.value);
    return new Negociacao(
      date,
      quantidade,
      valor
    );
  }

  limparFormulario(){
    this.inputData.value = '';
    this.inputQuantidade.value = '';
    this.inputValor.value = '';
    this.inputData.focus();
  }

  adicionar(): void {
    const negociacao = this.criarNegociacao();
    this.limparFormulario();
    console.log(negociacao);
  }
}