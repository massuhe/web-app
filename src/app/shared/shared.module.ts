import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { ProfileButtonComponent } from './profile-button/profile-button.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { RoutineButtonComponent } from './routine-button/routine-button.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ScreenLoaderComponent } from './screen-loader/screen-loader.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { SchedulerHoursComponent } from './scheduler/scheduler-hours/scheduler-hours.component';
import { SchedulerColumnComponent } from './scheduler/scheduler-column/scheduler-column.component';
import { SchedulerCellComponent } from './scheduler/scheduler-cell/scheduler-cell.component';
import { TabNavComponent } from './tab-nav/tab-nav.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { ModalComponent } from './modal/modal.component';
import { ContentLoaderComponent } from './content-loader/content-loader.component';
import { RemoveButtonComponent } from './remove-button/remove-button.component';
import { PermissionDirective } from './permission.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DeleteButtonComponent,
    ProfileButtonComponent,
    EditButtonComponent,
    RoutineButtonComponent,
    SearchInputComponent,
    ScreenLoaderComponent,
    SchedulerComponent,
    SchedulerHoursComponent,
    SchedulerColumnComponent,
    SchedulerCellComponent,
    TabNavComponent,
    AddButtonComponent,
    ModalComponent,
    ContentLoaderComponent,
    RemoveButtonComponent,
    PermissionDirective
  ],
  exports: [
    DeleteButtonComponent,
    ProfileButtonComponent,
    EditButtonComponent,
    RoutineButtonComponent,
    SearchInputComponent,
    ScreenLoaderComponent,
    SchedulerComponent,
    SchedulerHoursComponent,
    SchedulerColumnComponent,
    SchedulerCellComponent,
    TabNavComponent,
    AddButtonComponent,
    ModalComponent,
    ContentLoaderComponent,
    RemoveButtonComponent,
    PermissionDirective
  ]
})
export class SharedModule { }
