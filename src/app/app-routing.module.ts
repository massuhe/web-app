import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { ListadoAlumnosComponent } from './alumnos/listado-alumnos/listado-alumnos.component';
import { AgregarAlumnoComponent } from './alumnos/agregar-alumno/agregar-alumno.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'alumnos/listado',
    component: ListadoAlumnosComponent
  },
  {
    path: 'alumnos/agregar',
    component: AgregarAlumnoComponent
  },
  {
    path: 'alumnos',
    redirectTo: '/alumnos/listado',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
