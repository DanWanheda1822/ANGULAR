import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isMobile : boolean = false;

  constructor(){
    this.checkScreenSize();
  }

  checkScreenSize(){
    this.isMobile = window.innerWidth <= 768;
  }

}
