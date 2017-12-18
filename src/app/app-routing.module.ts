import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasesResolver } from './resolvers/ClasesResolver';

import { HomeComponent } from './home/home/home.component';
import { ListadoAlumnosComponent } from './alumnos/listado-alumnos/listado-alumnos.component';
import { AgregarAlumnoComponent } from './alumnos/agregar-alumno/agregar-alumno.component';
import { ListadoClasesComponent } from './clases/listado-clases/listado-clases.component';
import { ListadoClasesAlumnoComponent } from './clases/listado-clases-alumno/listado-clases-alumno.component';
import { ListadoActividadesComponent } from './actividades/listado-actividades/listado-actividades.component';
import { AgregarActividadComponent } from './actividades/agregar-actividad/agregar-actividad.component';

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
    component: ListadoAlumnosComponent,
    pathMatch: 'full'
  },
  {
    path: 'alumnos/agregar',
    component: AgregarAlumnoComponent,
    pathMatch: 'full'
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
    component: ListadoClasesAlumnoComponent
  },
  {
    path: 'actividades',
    component: ListadoActividadesComponent
  },
  {
    path: 'actividades/agregar',
    component: AgregarActividadComponent
  },
  {
    path: 'actividades/editar/:idActividad',
    component: AgregarActividadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
