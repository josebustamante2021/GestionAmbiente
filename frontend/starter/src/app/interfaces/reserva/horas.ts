export class Horas {
    horaInicio: string;
    horaFin: string;
    
    constructor(obj)
    {
        this.horaInicio = obj.horaInicio || '';
        this.horaFin = obj.horaFin || '';

    }
}