import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimulacionListaComponent } from './simulacion-lista/simulacion-lista.component';
import { DistribucionTurnoComponent } from './distribucion-turno/distribucion-turno.component';
import { ValidacionTurnoComponent } from './validacion-turno/validacion-turno.component';
import { SimulacionProgacademicasComponent } from './simulacion-progacademicas/simulacion-progacademicas.component';
import { PendingChangesGuard } from 'src/app/core/guard/pending-changes.guard';
const routes: Routes = [
  {
    path: '',
    component: SimulacionListaComponent,
    pathMatch: 'full',
  },
  {
    path: ':id/simulacion-progacademicas',
    component: SimulacionProgacademicasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimulacionRoutingModule {}
