import { Component, inject } from '@angular/core';
import { ActionService } from '../../shared/Action.service';
import { SharedModule } from '../../shared/shared.module';

//  Creating detail into standalone component
@Component({
  selector: 'app-detail',
  standalone: true,
  imports:[SharedModule],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail {

  actionService : ActionService = inject(ActionService)
  btnName : string = ''

  ngOnInit(){
    this.onButtonClick()
  }
  onButtonClick(){
    this.btnName = this.actionService.onActionClick()  
  }
}
