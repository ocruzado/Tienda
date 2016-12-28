import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from "@angular/common";
//import {BrowserModule} from '@angular/platform-browser';

import {SimpleTinyComponent} from './TinyMCE.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [ SimpleTinyComponent ],
    exports: [ SimpleTinyComponent ],
    imports: [
        CommonModule
        //BrowserModule
    ]
    //schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TinyMCEModule {
}
