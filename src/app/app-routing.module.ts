import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasesResolver } from './resolvers/ClasesResolver';

import { HomeComponent } from './home/home/home.component';
import { ListadoAlumnosComponent } from './alumnos/listado-alumnos/listado-alumnos.component';
import { AgregarAlumnoComponent } from './alumnos/agregar-alumno/agregar-alumno.component';
import { ListadoClasesComponent } from './clases/listado-clases/listado-clases.component';

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
    path: 'alumnos',
    component: ListadoAlumnosComponent
  },
  {
    path: 'alumnos/agregar',
    component: AgregarAlumnoComponent
  },
  {
    path: 'clases',
    component: ListadoClasesComponent,
    resolve: {
      clasesResolver: ClasesResolver
    }
  },
  {
    path: 'clases/alumno',
    component: HomeComponent
  },
  // {
  //   path: 'clases/alumno',
  //   component: ListadoClasesAlumnoComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
