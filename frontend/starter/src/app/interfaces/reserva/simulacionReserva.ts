export class SimulacionReserva {
    simulacionID: number;
    fecha: Date;
    fecha_convert: string;
    CodigoArea: string;
    //isSedeFilial: string;
    nombreFilial:string;
    CodigoSede: string;
    //isEspecialidad: string;
    CodigoEspecialidad: string;
    Semestre: string;
    annoProceso: string;
    mesProceso: string;
    numRegistros: string;
    usuario: string;
    id_login: number;
    CodigoTipoAmbiente: string;
    nameEstado:string;
    estado:number;    
    procesando:number;
    ciclo:string;
    constructor(obj)
    {
        this.simulacionID = obj.simulacionID ;
        this.fecha = obj.fecha ;
        this.fecha_convert = obj.fecha_convert || '';
        //this.isSedeFilial = obj.isSedeFilial;
        this.nombreFilial = obj.nombreFilial || '';
        this.CodigoSede = obj.CodigoSede || '';
        //this.isEspecialidad = obj.isEspecialidad ;
        this.CodigoEspecialidad = obj.CodigoEspecialidad || '';
        this.Semestre = obj.Semestre || '';
        this.annoProceso = obj.annoProceso || '';
        this.mesProceso = obj.mesProceso || '';
        this.numRegistros = obj.numRegistros || '';
        this.usuario = obj.usuario || '';
        this.id_login = obj.id_login;
        this.CodigoTipoAmbiente = obj.CodigoTipoAmbiente || '';
        this.nameEstado = obj.nameEstado || '';
        this.estado = obj.estado;
        this.procesando = obj.procesando;
        this.ciclo = obj.ciclo || '';

    }
}