import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { LoaderComponent } from "./Utility/loader/loader.component";
import { SnackbarComponent } from "./Utility/snackbar/snackbar.component";

@NgModule({
    declarations : [
        LoaderComponent,
        SnackbarComponent
    ],
    exports:[
        LoaderComponent,
        SnackbarComponent
    ],
    imports:[
        FormsModule
    ]
})
export class SharedModule{

}