import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView');
  private mensagemView = new MensagemView('#mensagemView');

  constructor(){
    this.inputData = document.querySelector('#data');
    this.inputQuantidade = document.querySelector("#quantidade");
    this.inputValor = document.querySelector('#valor');
    this.negociacoesView.update(this.negociacoes);
  }

  private criarNegociacao(): Negociacao {
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

  private limparFormulario(){
    this.inputData.value = '';
    this.inputQuantidade.value = '';
    this.inputValor.value = '';
    this.inputData.focus();
  }

  public adicionar(): void {
    const negociacao = this.criarNegociacao();

    if(!this.ehDiaUtil(negociacao.data)){
      this.mensagemView.update('Apenas negociações em dias úteis são aceitos.');
      return ;
    }
    
    this.negociacoes.adicionar(negociacao);
    this.limparFormulario();
    this.atualizaView();
  }

  private ehDiaUtil(data: Date):boolean {
    return data.getDate() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
  }

  private atualizaView():void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update('Negociação adicionado com sucesso.');
  }
}