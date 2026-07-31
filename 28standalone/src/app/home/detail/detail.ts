import { Component, inject } from '@angular/core';
import { ActionService } from '../../shared/Action.service';

@Component({
  selector: 'app-detail',
  standalone: false,
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
