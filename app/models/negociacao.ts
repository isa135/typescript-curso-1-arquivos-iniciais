export class Negociacao {
    // private _data: Date;
    // private _quantidade: number;
    // private _valor: number;

    constructor (
        private _data: Date, 
        private _quantidade: number,
        // Outra possibilidade 
        public readonly valor: number
    ){
        // this._data = _data;
        // this._quantidade = _quantidade;
        // this._valor = _valor;
    }

    // get data(): Date {
    //     const data = new Date(this._data)
    //     return this._data;
    // }

    get data(): Date {
        // programacao defensiva
        const data = new Date(this._data.getTime());
        return data;
    }

    get quantidade(): number {
        return this._quantidade;
    }

    // Usando readonly no valor
    // get valor(): number {
    //     return this._valor;
    // }

    get volume(): number {
        return this.quantidade * this.valor;
    }

    public static criaDe(dataString: string, quantidadeString: string, valorString: string) {
        const expressaoRegular = /-/g;
        const date = new Date(dataString.replace(expressaoRegular, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);

        console.log("Metodo estático criaDe");
        return new Negociacao(date, quantidade, valor);
    }
}