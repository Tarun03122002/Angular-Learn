import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// Lazy Load Dashboard Module
// 26angular-authentication/src/app/dashboard/dashboard.module.ts ,this file can contain multiple module export,so we have to specify module.DashboardModule to ensure which module we are lazy loading
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then((module) => module.DashboardModule) },
  { path: "login", loadChildren: () => import('./login/auth-module').then((module) => module.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
