import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { TestimonyComponent } from './home/testimony/testimony.component';
import { ServicesComponent } from './home/services/services.component';
import { PopularComponent } from './home/popular/popular.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { CurrencyPipe } from '@angular/common';
import { BannerComponent } from './home/banner/banner.component';
import { UserService } from './Services/user.service';
import { ServicesService } from './Services/service.service';
import { CourseDetailComponent } from './course-detail/course-detail.component';

// Defining a route
// 1) Use Routes Array to specify route in each object

const routes: Routes = [
  // { path: '**', component: NotFound },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'courses', component: Courses },
  { path: 'contact', component: Contact },
  { path: 'about', component: About },

  // Route parameter are the dynamic part of a route whose value can change.This provide way to pass additional information to that route
  // use colon through which angular knows it is a dynamic route,variable which store additional information
  {path:'courses/course/:id',component:CourseDetailComponent},
  // page not found route, ** wildcard route matches for all routes .Must be last element in routes array
  { path: '**', component: NotFound },
];
//  2) REGISTER routes array to angular provider array using RoutingModule.forRoot(routes) to be avaible throughout the app
// if used forChild ,it means it will be avaiblable for specify part of app

// 3) where to render the route component
// ,use routeroutlet
// we need to render b/w app-header and app-footer ,so use router-outlet in b/w of them
@NgModule({
  declarations: [App, Home, Header, Footer, Courses, Contact, About, NotFound, TestimonyComponent, ServicesComponent, PopularComponent,CourseDetailComponent, ContactUsComponent, BannerComponent],

  imports: [BrowserModule, CurrencyPipe, RouterModule.forRoot(routes)],
  providers: [provideBrowserGlobalErrorListeners(), CourseService, ServicesService],

  bootstrap: [App],
})
export class AppModule { }
