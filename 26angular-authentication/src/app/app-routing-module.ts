import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { canActivate } from './Guard/auth.guard';
import { Overview } from './dashboard/overview/overview';
import { Stats } from './dashboard/stats/stats';

const routes: Routes = [
   { path: '', component: HomeComponent }, 
    { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
