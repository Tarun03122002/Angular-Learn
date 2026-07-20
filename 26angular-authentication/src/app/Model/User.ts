export class User {

    //handling user form data on signup and login
    constructor(public userId: string, public email: string, private _expiresIn: Date, private _token: string) {
        this.userId = userId
        this.email = email
        this._expiresIn = _expiresIn
        this._token = _token
    }

    get token() { //not editable
        if (!this._token )// this._expiresIn < new Date() remove this condition to check flow
            return null
        return this._token
    }
}