import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserList } from './user-list/user-list';
import { UserService } from '../services/user.service';
import { UserDto } from '../user.dto';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule,UserList],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
  providers: [UserService,LoggerService]
})
export class Admin {

  genderOptions = [{label:'MALE',value:"M"},{label:'FEMALE',value:"F"}]
  subscStatusOptions = [{label:'ACTIVE',value:"A"},{label:'INACTIVE',value:"I"}]
  subscCategories=  [{label:'YEARLY',value:"Y"},{label:'MONTHLY',value:"M"},{label:'QUATERLY',value:"Q"}]

  userName : string = ''
  subscStatus : string = 'A'
  gender : string = 'M'
  subscCategory: string = 'M'

  constructor(private userService:UserService){

  }

  addUser(){
    console.log(this.userName,this.gender,this.subscCategory,this.subscStatus);
    const newUser = new UserDto(this.userName,this.gender,this.subscStatus,this.subscCategory)
    this.userService.addUser(newUser)
    console.log(this.userService.getAllUsers());
    
  }
}
