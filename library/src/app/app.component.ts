import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'library_manage';
 
  constructor(private authService: AuthService){
    
  }
  
  get isLogged() {
    return this.authService.isLoggedIn;
  }
}
