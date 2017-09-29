import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { NavModule } from './nav/nav.module';
import { HomeModule } from './home/home.module';
import { AlumnosModule } from './alumnos/alumnos.module';

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
    AlumnosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
