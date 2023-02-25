export class Negociacao {
    constructor(_data, _quantidade, valor) {
        this._data = _data;
        this._quantidade = _quantidade;
        this.valor = valor;
    }
    get data() {
        const data = new Date(this._data.getTime());
        return data;
    }
    get quantidade() {
        return this._quantidade;
    }
    get volume() {
        return this.quantidade * this.valor;
    }
    static criaDe(dataString, quantidadeString, valorString) {
        const expressaoRegular = /-/g;
        const date = new Date(dataString.replace(expressaoRegular, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        console.log("Metodo estático criaDe");
        return new Negociacao(date, quantidade, valor);
    }
}
