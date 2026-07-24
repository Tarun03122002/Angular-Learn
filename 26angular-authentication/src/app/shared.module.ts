import { NgModule } from "@angular/core";

import { LoaderComponent } from "./Utility/loader/loader.component";
import { SnackbarComponent } from "./Utility/snackbar/snackbar.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        LoaderComponent,
        SnackbarComponent
    ],
    exports: [
        LoaderComponent,
        SnackbarComponent,
        ReactiveFormsModule

    ],
    imports: [
        ReactiveFormsModule
    ]
})
export class SharedModule {

}