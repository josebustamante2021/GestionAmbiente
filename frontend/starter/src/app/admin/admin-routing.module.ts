import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { RolesGuard } from 'src/app/core/guard/roles.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'usuarios',
    canActivate:[RolesGuard],
    data: { 
      expectedRole: 'ROLE_Simulacion_Usuarios'
    } ,
    loadChildren: () =>
      import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },
  {
    path: 'reportes',
    canActivate:[RolesGuard],
    data: { 
      expectedRole: 'ROLE_Simulacion_Reportes'
    } ,
    loadChildren: () =>
      import('./reserva-reportes/reserva-reportes.module').then((m) => m.ReservaReportesModule),
  },
  {
    path: 'simulacion',
    canActivate:[RolesGuard],
    data: { 
      expectedRole: 'ROLE_Simulacion_Procesar'
    } ,
    loadChildren: () =>
      import('./simulacion/simulacion.module').then((m) => m.SimulacionModule),
  },
  {
    path: 'migracion',
    canActivate:[RolesGuard],
    data: { 
      expectedRole: 'ROLE_Simulacion_Migrar'
    } ,
    loadChildren: () =>
      import('./migracion/migracion.module').then((m) => m.MigracionModule),
  },
  {
    path: 'produccion',
    canActivate:[RolesGuard],
    data: { 
      expectedRole: 'ROLE_Produccion'
    } ,
    loadChildren: () =>
      import('./produccion/produccion.module').then((m) => m.ProduccionModule),
  },
  {
    path: 'asignacionManual',
    canActivate:[RolesGuard],
    data: { 
      expectedRole: 'ROLE_Simulacion_AsignacionManual'
    } ,
    loadChildren: () =>
      import('./asignacion-manual/asignacion-manual.module').then((m) => m.AsignacionManualModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
