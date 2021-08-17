import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllUsuariosComponent } from './all-usuarios/all-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: AllUsuariosComponent,
    pathMatch: 'full',
  },
  {
    path: 'all-usuarios',
    component: AllUsuariosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
