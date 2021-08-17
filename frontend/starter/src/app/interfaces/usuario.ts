import { Role } from 'src/app/core/models/role';

export class Usuario {
  id_login: number;
  img: string;
  lastName: string;
  firstName: string;
  userPrincipalName: string;
  role: Role;
  usuario: string;
  estado:boolean;
  token?: string;
}
