import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-navbar',
  imports: [],
  templateUrl: './profile-navbar.component.html',
  styleUrl: './profile-navbar.component.css'
})
export class ProfileNavbarComponent {

  isProfileSelected : boolean = false;


  showOptions(){
    if(!this.isProfileSelected){
      this.isProfileSelected = true;
    }else {
      this.isProfileSelected = false;
    }
    console.log('status --> ', this.isProfileSelected);
  }

}
