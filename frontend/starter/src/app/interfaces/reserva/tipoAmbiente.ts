export class TipoAmbiente {
    id: number;
    abreviatura: string;
    descripcion: string;
    codigo: string;
    constructor(obj)
    {
        this.id = obj.id ;
        this.abreviatura = obj.abreviatura || '';
        this.descripcion = obj.descripcion || '';
        this.codigo = obj.codigo || '';

    }
}