import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ValidacionService} from './validacion.service';
import {DialogService} from './dialog.service';
import { SerializeService } from './serialize.service';

@NgModule({
    imports: [
        CommonModule, // we use ngFor
    ],
    exports: [],
    declarations: [],
    providers: [ValidacionService, DialogService, SerializeService]
})
export class CoreModule {
}
