import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[appViewContainer]',
    standalone:false
})
export class ViewContainer{

    constructor(public viewContainerRef: ViewContainerRef){}

}