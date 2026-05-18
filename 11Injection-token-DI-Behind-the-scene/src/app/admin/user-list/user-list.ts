import { Component } from '@angular/core';
import { UserDto } from '../../../user.dto';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  standalone: false,
  styleUrl: './user-list.scss',
  // providers: [UserService]  it will create new instance of user service in child bcoz in its parent component ->admin,user service is already in providers
// so u will not be able to see new user in user list,remove UserService from child so that only 1 instance is created throught the application.
// Better to add service in module or in app component
// singleton class deign pattern is achieved
})
export class UserList {

  userList! : UserDto []

  constructor(private userService:UserService){
    this.userList = this.userService.getAllUsers()
  }
}
