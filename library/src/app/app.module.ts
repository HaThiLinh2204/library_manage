import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InsideLoginComponent } from './pages/inside-login/inside-login.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { NavigationBarComponent } from './pages/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookListComponent,
    InsideLoginComponent,
    CategoryListComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'',component: LoginComponent},
      { path: 'login', component: LoginComponent },
      {path:'book-list', component: BookListComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
