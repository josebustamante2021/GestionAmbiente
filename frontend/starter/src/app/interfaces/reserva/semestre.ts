export class Semestre {
    SemestreID: number;
    Semestre: string;
    Descripcion: string;
    constructor(obj)
    {
        this.SemestreID = obj.SemestreID ;
        this.Semestre = obj.Semestre || '';
        this.Descripcion = obj.Descripcion || '';

    }
}