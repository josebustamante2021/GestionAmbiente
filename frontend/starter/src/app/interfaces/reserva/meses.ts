export class Meses {
    idMes: number;
    codigo: string;
    descripcion: string;
    constructor(obj)
    {
        this.idMes = obj.idMes ;
        this.codigo = obj.codigo || '';
        this.descripcion = obj.descripcion || '';

    }
}