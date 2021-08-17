import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduccionListaComponent } from './produccion-lista/produccion-lista.component';
const routes: Routes = [
  {
    path: '',
    component: ProduccionListaComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduccionRoutingModule {}
