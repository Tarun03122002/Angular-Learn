import {  Route} from '@angular/router';
import { Home } from './home/home';

export const routes: Route[] = [
  {
      path:'',component : Home

  },
  {
    path : 'about',loadComponent : () => import('./about/about').then((m) => m.About)
  },
  {
    path:'courses',
    loadChildren : () => import('./courses/course-routes').then((m) => m.COURSE_ROUTES)
  }
];


