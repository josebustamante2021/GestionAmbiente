import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramacionAcademicaComponent } from './programacion-academica/programacion-academica.component';
const routes: Routes = [
  {
    path: '',
    component: ProgramacionAcademicaComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignacionManualRoutingModule {}
