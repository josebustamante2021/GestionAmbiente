export class Rol {
    id_rol: number;
    descripcion: string;
    constructor(obj)
    {
        this.id_rol = obj.id_rol ;
        this.descripcion = obj.descripcion || '';

    }
}