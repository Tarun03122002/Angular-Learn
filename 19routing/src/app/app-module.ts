import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Courses } from './courses/courses';
import { Contact } from './contact/contact';
import { CourseService } from './Services/course.service';
import { RouterModule, Routes } from '@angular/router';
import { About } from './about/about';
import { NotFound } from './not-found/not-found';

// Defining a route
// 1) Use Routes Array to specify route in each object

const routes: Routes = [
  { path: '**', component: NotFound },
  // {path:'',redirectTo:'home',pathMatch:'full'},
  { path: '', component: Courses },
  { path: 'home', component: Courses },
  { path: 'courses', component: Courses },
  { path: 'contact', component: Contact },
  { path: 'about', component: About },
  // page not found route, ** wildcard route matches for all routes .Must be last element in routes array
  { path: '**', component: NotFound },
];
//  2) REGISTER routes array to angular provider array using RoutingModule.forRoot(routes) to be avaible throughout the app
// if used forChild ,it means it will be avaiblable for specify part of app

// 3) where to render the route component
// ,use routeroutlet
// we need to render b/w app-header and app-footer ,so use router-outlet in b/w of them
@NgModule({
  declarations: [App, Home, Header, Footer, Courses, Contact, About, NotFound],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [provideBrowserGlobalErrorListeners(), CourseService],

  bootstrap: [App],
})
export class AppModule {}
