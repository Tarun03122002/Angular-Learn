import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone:false
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { 

  }

  users: User[] = [];
  showDialog : boolean = false
  userToDelete! : User

  ngOnInit() {
    this.users = this.userService.users;
  }

  userDeleteClicked(user:User){
    this.showDialog = true
    this.userToDelete = user
  }

  dialogActionSubscribe(yesBtnClicked : Event){    
    this.showDialog = false
    if(yesBtnClicked){
      const userToBeDeletedIndex = this.users.indexOf(this.userToDelete)
      this.users.splice(userToBeDeletedIndex,1)
    }
  }
}
