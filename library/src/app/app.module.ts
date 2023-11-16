import { NgModule } from '@angular/core';
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
@NgModule({
  declarations: [AppComponent, InsideLoginComponent],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    MatInputModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, },
      { path: 'login', component: LoginComponent,  },
      { path: 'book-list', component: BookListComponent , canActivate: [myGuardGuard],},
      // { path: 'category-list', component: CategoryListComponent },
      // { path: 'updated-book', component: UpdatedBookComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

