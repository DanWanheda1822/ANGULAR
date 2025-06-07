import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProfileNavbarComponent } from "../../components/profile-navbar/profile-navbar.component";
import { UsersService } from '../../services/users.service';
import { ResponseUser } from '../../models/UserResponse';

@Component({
  selector: 'app-login',
  imports: [ProfileNavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isMobile : boolean = false;

  constructor(private userService: UsersService){
    this.checkScreenSize();
  }


  checkScreenSize(){
    this.isMobile = window.innerWidth <= 768;
  }
  
}
