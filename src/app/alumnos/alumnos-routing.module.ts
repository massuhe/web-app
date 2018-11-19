import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateAuthGuard } from '../_guards/CanActivateAuth';
import { ListadoAlumnosComponent } from './listado-alumnos/listado-alumnos.component';
import { ReporteIngresosAlumnosComponent } from './reporte-ingresos-alumnos/reporte-ingresos-alumnos.component';
import { AgregarAlumnoComponent } from './agregar-alumno/agregar-alumno.component';
import { PerfilAlumnoComponent } from './perfil-alumno/perfil-alumno.component';
import { CambiarContrasenaComponent } from '../shared/cambiar-contrasena/cambiar-contrasena.component';
import { perfilBuildMatcher, cambiarContrasenaBuildMatcher, alumnosBuildMatcher } from '../shared/_utils/buildMatcher';


const routes: Routes = [
  {
    matcher: perfilBuildMatcher,
    component: PerfilAlumnoComponent,
    canActivate: [CanActivateAuthGuard],
    data: { roles: ['VER_PERFIL_ALUMNO'] }
  },
  {
    matcher: cambiarContrasenaBuildMatcher,
    component: CambiarContrasenaComponent,
    canActivate: [CanActivateAuthGuard],
    data: { roles: ['MODIFICAR_ALUMNO'] }
  },
  {
    matcher: alumnosBuildMatcher,
    component: ListadoAlumnosComponent,
    canActivate: [CanActivateAuthGuard],
    data: { roles: ['VER_USUARIOS'] }
  },
  {
    path: 'reporte',
    component: ReporteIngresosAlumnosComponent,
    canActivate: [CanActivateAuthGuard],
    data: { roles: ['REPORTE_INGRESOS_ALUMNOS'] }
  },
  {
    path: 'agregar',
    component: AgregarAlumnoComponent,
    canActivate: [CanActivateAuthGuard],
    data: { roles: ['CREAR_USUARIO'] }
  },
  {
    path: ':idAlumno/editar',
    component: AgregarAlumnoComponent,
    canActivate: [CanActivateAuthGuard],
    data: { roles: ['MODIFICAR_USUARIO'] }
  },
  {
    path: ':idAlumno/perfil',
    component: PerfilAlumnoComponent,
    canActivate: [CanActivateAuthGuard],
    data: { roles: ['VER_PERFIL'] }
  },
  {
    path: ':idUsuario/cambiarContrasena',
    component: CambiarContrasenaComponent,
    canActivate: [CanActivateAuthGuard],
    data: { roles: ['MODIFICAR_USUARIO'] }
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
