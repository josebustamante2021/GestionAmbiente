export class Ambiente {
    ambienteID: number;
    sede: string;
    pabellon: string;
    piso: number;
    tipo: string;
    codigo: string;
    descripcion: string;
    aream2: number;
    aforo: number;
    nroInstalaciones: number;
    constructor(obj)
    {
        this.ambienteID = obj.ambienteID ;
        this.sede = obj.sede || '';
        this.pabellon = obj.pabellon || '';
        this.piso = obj.piso;
        this.tipo = obj.tipo || '';
        this.codigo = obj.codigo || '';
        this.descripcion = obj.descripcion || '';
        this.aream2 = obj.aream2;
        this.aforo = obj.aforo;
        this.nroInstalaciones = obj.nroInstalaciones;


    }
}