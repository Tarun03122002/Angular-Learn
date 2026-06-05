import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css'],
  standalone:false

})
export class ConfirmDeleteComponent implements OnInit {


  @Output() dialogActionClicked : EventEmitter<boolean> = new EventEmitter<boolean>()

  ngOnInit() {
  }

  dialogBtnClick(yesClicked : boolean){    
    this.dialogActionClicked.emit(yesClicked)
  }
}
