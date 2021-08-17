export class Especialidad {
    EspecialidadID: number;
    CodigoEspecialidad: string;
    Descripcion: string;
    Abreviatura: string;
    CodigoArea: string;
    constructor(obj)
    {
        this.EspecialidadID = obj.EspecialidadID ;
        this.CodigoEspecialidad = obj.CodigoArea || '';
        this.Descripcion = obj.Descripcion || '';
        this.Abreviatura = obj.Abreviatura || '';
        this.CodigoArea = obj.CodigoArea || '';

    }
}