import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';

const routes: Routes = [
  {
      path:'',component : Home

  },
  {
    path : 'about',loadComponent : () => import('./about/about').then((m) => m.About)
  },
  {
    path:'courses',
    loadChildren : () => import('./courses/course-module').then((m) => m.Course)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
