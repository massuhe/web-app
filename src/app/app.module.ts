import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ClasesResolver } from './resolvers/ClasesResolver';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { NavModule } from './nav/nav.module';
import { HomeModule } from './home/home.module';
import { AlumnosModule } from './alumnos/alumnos.module';
import { ClasesModule } from './clases/clases.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    NavModule,
    HomeModule,
    AlumnosModule,
    ClasesModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }, ClasesResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
