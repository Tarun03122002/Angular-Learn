import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { User } from '../Models/User';
import { UserService } from '../Services/user.service';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { ViewContainer } from '../ViewContainer.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: false
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {

  }

  users: User[] = [];
  showDialog: boolean = false
  userToDelete!: User
  @ViewChild(ViewContainer) viewContainer!: any;

  subsc! : Subscription

  ngOnInit() {
    this.users = this.userService.users;
  }

  userDeleteClicked(user: User) {
    // this.showDialog = true
    this.userToDelete = user
    this.createConfirmDeleteComponentDynamically(this.userToDelete)
  }

  dialogActionSubscribe(yesBtnClicked: boolean) {
    this.showDialog = false
    if (yesBtnClicked) {
      const userToBeDeletedIndex = this.users.indexOf(this.userToDelete)
      this.users.splice(userToBeDeletedIndex, 1)
    }
  }

  createConfirmDeleteComponentDynamically(user: User) {

    // Step1 -> Create instance of ConfirmDeleteComponent using componenentFactoryResolver
    const componentFactoryConfirmDeleteComponent: ComponentFactory<ConfirmDeleteComponent> = this.componentFactoryResolver.resolveComponentFactory(ConfirmDeleteComponent)

    // Step2 -> Render instance into containerRef
    console.log(this.viewContainer);

    const componentRef = this.viewContainer.viewContainerRef.createComponent(componentFactoryConfirmDeleteComponent);
    componentRef.instance.userToDelete = user;
    this.subsc = componentRef.instance.dialogActionClicked.subscribe((yesBtnClicked: boolean) => {
      this.subsc.unsubscribe();
      this.viewContainer.viewContainerRef.clear();
      if (yesBtnClicked) {
        const userToBeDeletedIndex = this.users.indexOf(this.userToDelete)
        this.users.splice(userToBeDeletedIndex, 1)
      }
    });
  }
}
