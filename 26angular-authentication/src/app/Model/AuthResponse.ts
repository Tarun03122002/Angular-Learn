export class AuthResponse{
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string ;//no of seconds in which idToken(jwt token) expires
    localId : string;
    kind? : string;
    registered? : boolean
}