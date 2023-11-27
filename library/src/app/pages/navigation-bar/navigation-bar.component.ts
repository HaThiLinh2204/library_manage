import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}
  onLogOut() {
    this.authService.isLoggedIn = false;
    this.router.navigate([`/login`]);
  }
}
