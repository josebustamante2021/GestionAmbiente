export class Filial {
    filialID: number;
    codigoFilial: string;
    descripcion: string;
    abreviatura: string;
    constructor(obj)
    {
        this.filialID = obj.filialID ;
        this.codigoFilial = obj.codigoFilial || '';
        this.descripcion = obj.descripcion || '';
        this.abreviatura = obj.abreviatura || '';

    }
}