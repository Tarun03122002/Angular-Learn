import { AbstractControl, FormControl } from "@angular/forms";

export const noSpaceValidator = (control: AbstractControl|FormControl) => {
    if (control?.value && control.value.indexOf(" ") != -1)
        return { noSpaceValidator: true };
    return null
}

export class CustomValidator {
    static noSpaceValidator(control: AbstractControl|FormControl) {
        if (control?.value && control.value.indexOf(" ") != -1)
            return { noSpaceValidator: true };
        return null
    }
}