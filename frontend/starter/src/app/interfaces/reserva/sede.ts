export class Sede {
    SedeID: number;
    codigoSede: string;
    TipoSedeID: number;
    Descripcion: string;
    Abreviatura: string;
    EstadoSede: number;
    FilialID: number;
    constructor(obj)
    {
        this.SedeID = obj.SedeID ;
        this.codigoSede = obj.codigoSede || '';
        this.TipoSedeID = obj.TipoSedeID;
        this.Descripcion = obj.Descripcion || '';
        this.Abreviatura = obj.Abreviatura || '';
        this.EstadoSede = obj.EstadoSede;
        this.FilialID = obj.FilialID;

    }
}