export class UserDto{
  name! : string;
  gender! : string;
  subsStatus! : string;
  subscCategory! : string

  constructor(name: string,gender: string,subscStatus: string,subscCategory : string){
    this.name = name
    this.gender = gender
    this.subsStatus = subscStatus
    this.subscCategory = subscCategory
  }
}
