export class ProgramacionAcademica {
    SimulacionID: number;
    codigoAca: number;
    annoProceso:string;
    mesProceso:string;
    CodigoArea:string;
    semestre:string;
    CodigoSede:string;
    ciclo:string;
    CodigoEspecialidad:string;
    Turno:string;
    capacidad:number;
    capacidadDocente:number;
    matriculados:number;
    FechaInicio:Date;
    FechaFin:Date;
    nombreArea:string;
    nombreSede:string;
    nombreEspecialidad:string;
    nombrePrograma:string;
    curso:string;
    HorasRepetidas: boolean;
    SinAmbiente: boolean;
    ambiente:string;
    grupo:number;
    horarios:number;
    idLogin:number;
    
    constructor(obj)
    {

    }
}