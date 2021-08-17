export class Distribucion {
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
    manana: number;
    tarde: number;
    noche: number;
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
        this.manana = obj.manana;
        this.tarde = obj.tarde;
        this.noche = obj.noche;

    }
}