import { NgModule } from "@angular/core";

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
})
export class SharedModule{

}