import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MigracionListaComponent } from './migracion-lista/migracion-lista.component';
const routes: Routes = [
  {
    path: '',
    component: MigracionListaComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MigracionRoutingModule {}
