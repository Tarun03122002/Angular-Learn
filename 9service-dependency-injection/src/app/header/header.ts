import { Component } from '@angular/core';
import { Home } from './home/home';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone:false,
  providers : [SubscriptionService]
})
// Adding Depenendcy steps 
// 1) What to add 
export class Header {

  // 2)How to add dependency
  // Here Firstly Angular will inject SubscriptionService,then it will create instance of SubscriptionService ,then in background subService property will be get assigned with  
  // paramter subService value

  // Important
  // All the child components of header component have same instance (single instance) of subcriptionService unless if any childcomponent have SubscriptionService depenency in 
  //it providers array.If it exists,then it will override parent component DI with child component.
  // It means for that child,another instance of subcription service will get created 
  constructor(private subService:SubscriptionService){

  }
  onSubClick(subType : string){
    //1)  Add subscription  entry for user in db

    // 2) send mail to user for subscription confirmation

    // 3)Provide subscription functionality to user
    // alert(`Thank you for ${subType} subscription`)
    
    // instead of above use service
    // const subsc = new SubscriptionService()

    this.subService.onSubClick(subType)


  }
}
