import { AbstractControl, FormControl } from "@angular/forms";

export const noSpaceValidator = (control: AbstractControl | FormControl) => {
    if (control?.value && control.value.indexOf(" ") != -1)
        return { noSpaceValidator: true };
    return null
}

export class CustomValidator {
    static noSpaceValidator(control: AbstractControl | FormControl) {
        if (control?.value && control.value.indexOf(" ") != -1)
            return { noSpaceValidator: true };
        return null
    }

}

export const validateUserName = (control:AbstractControl | FormControl) : Promise<any> => {
    console.log(checkValidUserName(control.value));
    
    return checkValidUserName(control.value)

}

function checkValidUserName(userName: string) {
        const validUserName = ['John Smith', 'Abbas Mastan', 'King Joseph']
            return new Promise((res,rej) =>{                
                setTimeout(() => {
                    if(validUserName.includes(userName))
                           return res({userNameInvalid:true})
                    return res(null)
                },5000)
            })
      
}