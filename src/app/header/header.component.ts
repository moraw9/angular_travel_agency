import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn = false;
  role: string= '';

  constructor(
    private authService: AuthService,
    private router: Router) {
      this.authService.authState$.subscribe(auth => {
        if(auth) {
          this.isLoggedIn = true;
          authService.getUserRoles$().subscribe(users =>{
            const filteredRole = users.filter(role => role.uid === auth.uid);
            this.role = filteredRole[0].role;
          });
         
        } else {
          this.isLoggedIn = false;
        }

      });
      
    }


  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/']));
      

  
  }

}
