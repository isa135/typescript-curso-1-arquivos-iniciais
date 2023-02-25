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
    private negociacoesView = new NegociacoesView('#negociacoesView', true);
    private mensagemView = new MensagemView('#mensagemView');

    constructor() {
        // CASTING - DEIXANDO EXPLICITO O TIPO
        this.inputData = <HTMLInputElement>document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void {
        // const negociacao = this.criaNegociacao();

        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        )

        console.log("Metodo adiciona ", negociacao);

        // negociacao.data.setDate(13);
        // 0 - 6 Domingo
        // if (negociacao.data.getDay() > 0 && negociacao.data.getDay() < 6) {
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias úteis serão aceitas');
            return;
        }
        
        // ReadonlyArray inibe o metodo pop
        // this.negociacoes.lista().pop();
        this.negociacoes.adiciona(negociacao);
        
        console.log("Negociacoes: ", this.negociacoes.lista());
        this.limparFormulario();
        this.atualizaView();
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }

    // private criaNegociacao(): Negociacao {
        // Será criado um método estático com o trecho abaixo:
        // const expressaoRegular = /-/g;
        // const date = new Date(this.inputData.value.replace(expressaoRegular, ','));
        // const quantidade = parseInt(this.inputQuantidade.value);
        // const valor = parseFloat(this.inputValor.value);

        // console.log("Metodo criaNegociacao");
        // return new Negociacao(date, quantidade, valor);

        
    // }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
} 