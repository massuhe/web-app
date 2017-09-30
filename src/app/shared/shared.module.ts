import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { ProfileButtonComponent } from './profile-button/profile-button.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { RoutineButtonComponent } from './routine-button/routine-button.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ScreenLoaderComponent } from './screen-loader/screen-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DeleteButtonComponent,
    ProfileButtonComponent,
    EditButtonComponent,
    RoutineButtonComponent,
    SearchInputComponent,
    ScreenLoaderComponent
  ],
  exports: [
    DeleteButtonComponent,
    ProfileButtonComponent,
    EditButtonComponent,
    RoutineButtonComponent,
    SearchInputComponent,
    ScreenLoaderComponent
  ]
})
export class SharedModule { }
