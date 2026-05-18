import { Component, inject } from '@angular/core';
import { UserDto } from '../../../user.dto';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {

  selectedUser! : UserDto

  userService = inject(UserService)

  ngOnInit(){
    // subscribe to event which contains selected user details

    // internally observable is used
    this.userService.selectedUserDetail.subscribe((data: UserDto) => {
      this.selectedUser = data
      console.log(this.selectedUser,"selected user");
      
    })
  }
}
