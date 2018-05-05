import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { NavModule } from './nav/nav.module';
import { HomeModule } from './home/home.module';
import { AlumnosModule } from './alumnos/alumnos.module';
import { ClasesModule } from './clases/clases.module';
import { ActividadesModule } from './actividades/actividades.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { JwtInterceptor } from './_interceptors/JwtInterceptor';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SeguridadModule } from './seguridad/seguridad.module';
import { InventarioModule } from './inventario/inventario.module';
import { FinanzasModule } from './finanzas/finanzas.module';
import { RutinasModule } from './rutinas/rutinas.module';
import { EjerciciosModule } from './ejercicios/ejercicios.module';

registerLocaleData(localeEsAr);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PrincipalComponent,
    LoginComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    NavModule,
    HomeModule,
    AlumnosModule,
    UsuariosModule,
    ClasesModule,
    RutinasModule,
    InventarioModule,
    SeguridadModule,
    ActividadesModule,
    FinanzasModule,
    EjerciciosModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-AR'
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule {}
