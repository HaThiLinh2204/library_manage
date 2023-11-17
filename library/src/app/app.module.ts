import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';

import { InsideLoginComponent } from './pages/inside-login/inside-login.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { myGuardGuard } from './my-guard.guard';
import { HttpClientModule } from '@angular/common/http';

import { CategoryComponent } from './pages/category/category.component';
import { UpdatedBookComponent } from './pages/updated-book/updated-book.component';
import { NavigationBarComponent } from './pages/navigation-bar/navigation-bar.component';
@NgModule({
  declarations: [AppComponent, InsideLoginComponent, NavigationBarComponent],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    MatInputModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'book-list',
        component: BookListComponent,
        canActivate: [myGuardGuard],
      },
      {
        path: 'category-list',
        component: CategoryComponent,
        canActivate: [myGuardGuard],
      },
      {
        path: 'updated-book',
        component: UpdatedBookComponent,
        canActivate: [myGuardGuard],
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
