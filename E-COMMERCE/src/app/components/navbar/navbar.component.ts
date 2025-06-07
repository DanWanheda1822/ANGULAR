import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  collapse : boolean = false;
  isMdOrLarger : boolean = false;
  filtersMobile : boolean = false;

  constructor() {
    this.checkScreenSize(); // Verifica el tamaño de la pantalla al iniciar
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize(); // Verifica el tamaño de la pantalla al redimensionar
  }

  collapseButton(){
      this.collapse = !this.collapse;
      console.log('estado --> ', this.collapse)
  }

  checkScreenSize() {
    this.isMdOrLarger = window.innerWidth >= 767;
  }

  
}
