import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidacionService } from './validacion.service';
import { DialogService } from './dialog.service';
import { SerializeService } from './serialize.service';
import { AuthenticationService } from './authentication.service';

@NgModule({
    imports: [
        CommonModule, // we use ngFor
    ],
    exports: [],
    declarations: [],
    providers: [ValidacionService, DialogService, SerializeService, AuthenticationService]
})
export class CoreModule {
}
