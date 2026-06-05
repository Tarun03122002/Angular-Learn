import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../Models/User';

@Component({
  selector: 'confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css'],
  standalone:false

})
export class ConfirmDeleteComponent implements OnInit {

  @Input() userToDelete! : User
  
  @Output() dialogActionClicked : EventEmitter<boolean> = new EventEmitter<boolean>()

  ngOnInit() {
  }

  dialogBtnClick(yesClicked : boolean){    
    this.dialogActionClicked.emit(yesClicked)
  }
}
