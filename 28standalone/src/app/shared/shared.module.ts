import { NgModule } from "@angular/core";
import { HighlightDirective } from "./app-highlight.directive";

@NgModule({
    declarations:[
        HighlightDirective
    ],
    exports:[
        HighlightDirective
    ]
})
export class SharedModule{

}