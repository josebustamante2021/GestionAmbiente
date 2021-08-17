export class Validacion {
    id: number;
    area: string;
    semestre: string;
    sede: string;
    escuela: string;
    ciclo: string;
    asignatura: string;
    turno: string;
    finicio: string;
    ffin: string;
    ambiente: string;
    grupo: number;
    lunes: string;
    martes: string;
    miercoles: string;
    jueves: string;
    viernes: string;
    sabado: string;
    domingo: string;
    cumple: string;

    constructor(obj)
    {
        this.id = obj.id ;
        this.area = obj.area || '';
        this.semestre = obj.semestre;
        this.sede = obj.sede;
        this.escuela = obj.escuela;
        this.ciclo = obj.ciclo;
        this.asignatura = obj.asignatura;
        this.turno = obj.turno;
        this.finicio = obj.finicio;
        this.ffin = obj.ffin;
        this.ambiente = obj.ambiente;
        this.grupo = obj.grupo;
        this.lunes = obj.lunes;
        this.martes = obj.martes;
        this.miercoles = obj.miercoles;
        this.jueves = obj.jueves;
        this.viernes = obj.viernes;
        this.sabado = obj.sabado;
        this.domingo = obj.domingo;
        this.cumple = obj.cumple;

    }
}