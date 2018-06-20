import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargarDetallesRutinaComponent } from './cargar-detalles-rutina/cargar-detalles-rutina.component';
import { GestionRutinaComponent } from './gestion-rutina/gestion-rutina.component';
import { AgregarRutinaComponent } from './agregar-rutina/agregar-rutina.component';
import { CanActivateAuthGuard } from '../_guards/CanActivateAuth';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GestionRutinaComponent,
    canActivate: [CanActivateAuthGuard],
    data: { roles: ['VER_RUTINA', 'VER_RUTINA_ALUMNO'] }
  },
  {
    path: 'agregar',
    component: AgregarRutinaComponent,
    canActivate: [CanActivateAuthGuard],
    data: { roles: ['CREAR_RUTINA'] }
  },
  {
    path: 'editar',
    component: AgregarRutinaComponent,
    canActivate: [CanActivateAuthGuard],
    data: { roles: ['MODIFICAR_RUTINA'] }
  },
  {
    path: ':numeroDia/cargarDetalles',
    component: CargarDetallesRutinaComponent,
    canActivate: [CanActivateAuthGuard],
    data: { roles: ['CARGAR_DETALLES', 'CARGAR_DETALLES_ALUMNO'] }
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
