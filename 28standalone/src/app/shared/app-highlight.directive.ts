import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[appHighlight]',
    standalone : false
})
export class HighlightDirective {

    constructor(private element: ElementRef) {

    }

    ngOnInit() {
        this.element.nativeElement.style.backgroundColor = "red"
        this.element.nativeElement.style.padding = "10px"
        this.element.nativeElement.style.color = "yellow"

    }
}