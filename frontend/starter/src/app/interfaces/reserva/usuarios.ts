export class Usuarios {
    id_login: number;
    name: string;
    usuario: string;
    role: string;
    constructor(obj)
    {
        this.id_login = obj.id_login ;
        this.name = obj.name || '';
        this.usuario = obj.usuario || '';
        this.role = obj.role || '';

    }
}