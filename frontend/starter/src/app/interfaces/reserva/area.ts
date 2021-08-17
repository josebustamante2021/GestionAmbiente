export class Area {
    areaID: number;
    codigoArea: string;
    descripcion: string;
    abreviatura: string;
    
    constructor(obj)
    {
        this.areaID = obj.areaID ;
        this.codigoArea = obj.codigoArea || '';
        this.descripcion = obj.descripcion || '';
        this.abreviatura = obj.abreviatura || '';

    }
}