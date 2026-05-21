import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceTs {

  // createTask : EventEmitter<string> = new EventEmitter<string>();

  // using subject

  createTask = new Subject<string>()

  onAddingTask(task : string){
    // this.createTask.emit(task);
    this.createTask.next(task)
  }
}
