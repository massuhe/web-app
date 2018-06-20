import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { CanActivateAuthGuard } from '../_guards/CanActivateAuth';
import { ListadoAlumnosComponent } from './listado-alumnos/listado-alumnos.component';
import { ReporteIngresosAlumnosComponent } from './reporte-ingresos-alumnos/reporte-ingresos-alumnos.component';
import { AgregarAlumnoComponent } from './agregar-alumno/agregar-alumno.component';
import { PerfilAlumnoComponent } from './perfil-alumno/perfil-alumno.component';
import { CambiarContrasenaComponent } from '../shared/cambiar-contrasena/cambiar-contrasena.component';

const buildMatcher = (segmentCompare: string) => (url, group) => {
  const segment = group.segments[0] && group.segments[0].path;
  if (!segment || segment !== segmentCompare) {
    return null;
  }
  return {consumed: []};
};

const routes: Routes = [
  {
    matcher: buildMatcher('perfil'),
    component: PerfilAlumnoComponent,
    canActivate: [CanActivateAuthGuard],
    data: { roles: ['VER_PERFIL_ALUMNO'] }
  },
  {
    matcher: buildMatcher('cambiarContrasena'),
    component: CambiarContrasenaComponent,
    canActivate: [CanActivateAuthGuard],
    data: { roles: ['MODIFICAR_ALUMNO'] }
  },
  {
    matcher: buildMatcher('alumnos'),
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
