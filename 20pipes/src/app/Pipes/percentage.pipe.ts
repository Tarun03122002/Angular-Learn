// cREATING A CUSTOM PIPE
// 1 -> Creating and exporting class and implement PipeTransform class.Also class Name  should end with Pipe (Convention)
// 2 -> Implement transform method  of PipeTransform class.
//  3) Use @Pipe Deacoartion with name as metdata in object and declartion pipe in decalartion

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'percentage',
    standalone : false
})
export class PercentPipe implements PipeTransform{

    transform(value: any,afterDecimalDigits : number=0) {
        return (value * 100).toFixed(afterDecimalDigits);
    }
}