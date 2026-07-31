import { Component, inject } from '@angular/core';
import { ActionService } from '../../shared/Action.service';
import { HighlightDirective } from '../../shared/app-highlight.directive';

//  Creating detail into standalone component
@Component({
  selector: 'app-detail',
  standalone: true,
  imports:[HighlightDirective],
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
