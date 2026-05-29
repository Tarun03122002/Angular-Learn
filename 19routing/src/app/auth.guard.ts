// AFTER ANGULAR 14 OR In latest version,functional approach is used

import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "./Services/auth.service"

// 1 Create a function which will return boolean value and write business logic here
// 2) Use function in route guard property of route object

export const canActivate = () => {
    const router = inject(Router)
    const authService = inject(AuthService)

    if (authService.isAuthentiacted()) {
        return true
    } else {
        router.navigate(['login'])
        return false

    }
}

export const canActivateChild = () => {
    return canActivate();
}