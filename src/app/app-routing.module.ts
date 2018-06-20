import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { ListadoClasesComponent } from './clases/listado-clases/listado-clases.component';
import { ListadoClasesAlumnoComponent } from './clases/listado-clases-alumno/listado-clases-alumno.component';
import { ListadoActividadesComponent } from './actividades/listado-actividades/listado-actividades.component';
import { AgregarActividadComponent } from './actividades/agregar-actividad/agregar-actividad.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { CanActivateAuthGuard } from './_guards/CanActivateAuth';
import { CanActivateLoginGuard } from './_guards/CanActivateLogin';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { CanActivateClassGuard } from './_guards/CanActivateClass';
import { SuspenderClasesComponent } from './clases/suspender-clases/suspender-clases.component';
import { ListadoUsuariosComponent } from './usuarios/listado-usuarios/listado-usuarios.component';
import { AgregarUsuarioComponent } from './usuarios/agregar-usuario/agregar-usuario.component';
import { ListadoRolesComponent } from './seguridad/listado-roles/listado-roles.component';
import { AgregarRolComponent } from './seguridad/agregar-rol/agregar-rol.component';
import { GestionInventarioComponent } from './inventario/gestion-inventario/gestion-inventario.component';
import { RegistrarPagoComponent } from './finanzas/registrar-pago/registrar-pago.component';
import { BalanceGeneralComponent } from './finanzas/balance-general/balance-general.component';
import { ListadoPagosComponent } from './finanzas/listado-pagos/listado-pagos.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanActivateLoginGuard],
  },
  {
    path: '',
    component: PrincipalComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'alumnos',
        loadChildren: './alumnos/alumnos.module#AlumnosModule'
      },
      {
        path: 'perfil',
        loadChildren: './alumnos/alumnos.module#AlumnosModule'
      },
      {
        path: 'cambiarContrasena',
        loadChildren: './alumnos/alumnos.module#AlumnosModule'
      },
      {
        path: 'clases',
        component: ListadoClasesComponent,
        canActivate: [CanActivateClassGuard],
      },
      {
        path: 'clases/alumno',
        component: ListadoClasesAlumnoComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['VER_LISTADO_CLASES_ESPECIFICAS_ALUMNO']}
      },
      {
        path: 'clases/suspender',
        component: SuspenderClasesComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['SUSPENDER_CLASES']}
      },
      {
        path: 'actividades',
        component: ListadoActividadesComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['VER_ACTIVIDADES']}
      },
      {
        path: 'actividades/agregar',
        component: AgregarActividadComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['CREAR_ACTIVIDAD']}
      },
      {
        path: 'actividades/:idActividad/editar',
        component: AgregarActividadComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['MODIFICAR_ACTIVIDAD']}
      },
      {
        path: 'usuarios',
        component: ListadoUsuariosComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['VER_USUARIOS']}
      },
      {
        path: 'usuarios/agregar',
        component: AgregarUsuarioComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['CREAR_USUARIO']}
      },
      {
        path: 'usuarios/:idUsuario/editar',
        component: AgregarUsuarioComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['MODIFICAR_USUARIO']}
      },
      {
        path: 'roles',
        component: ListadoRolesComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['VER_ROLES']}
      },
      {
        path: 'roles/agregar',
        component: AgregarRolComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['CREAR_ROL']}
      },
      {
        path: 'roles/:idRol/editar',
        component: AgregarRolComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['MODIFICAR_ROL']}
      },
      {
        path: 'inventario',
        component: GestionInventarioComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['VER_ITEMS_INVENTARIO']}
      },
      {
        path: 'pagos',
        component: ListadoPagosComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['VER_LISTADO_PAGOS']}
      },
      {
        path: 'pagos/registrar',
        component: RegistrarPagoComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['CREAR_CUOTA', 'MODIFICAR_CUOTA']}
      },
      {
        path: 'balance',
        component: BalanceGeneralComponent,
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['VER_MOVIMIENTOS', 'CREAR_MOVIMIENTO', 'VER_CUOTAS']}
      },
      {
        path: 'alumnos/:idAlumno/rutina',
        loadChildren: './rutinas/rutinas.module#RutinasModule',
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['VER_RUTINAS', 'VER_RUTINA', 'CREAR_RUTINA', 'MODIFICAR_RUTINA', 'ELIMINAR_RUTINA', 'CARGAR_DETALLES']}
      },
      {
        path: 'rutina',
        loadChildren: './rutinas/rutinas.module#RutinasModule',
        canActivate: [CanActivateAuthGuard],
        data: {roles: ['VER_RUTINA_ALUMNO', 'CARGAR_DETALLES_ALUMNO']}
      }
    ]
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  { path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateAuthGuard, CanActivateLoginGuard, CanActivateClassGuard]
})
export class AppRoutingModule {}
