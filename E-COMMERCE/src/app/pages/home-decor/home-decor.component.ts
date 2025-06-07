import { Component, HostListener, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home-decor',
  imports: [NavbarComponent],
  templateUrl: './home-decor.component.html',
  styleUrl: './home-decor.component.css'
})
export class HomeDecorComponent implements AfterViewInit{

  isMobileView : boolean = false;

  constructor(){
    this.checkScreenSize();
  }

  ngAfterViewInit(): void {
    this.initComponentAnimation();
  }

  @HostListener('window:resize',['$event'])
  onResize(){
    this.checkScreenSize();
  }


  checkScreenSize(){
    this.isMobileView = window.innerWidth <= 768;
  }

  @ViewChild('textDecor') textDecor! : ElementRef;
  @ViewChild('bnDecorOne') bnDecorOne! : ElementRef;
  @ViewChild('bnDecorText') bnDecorText! : ElementRef;


  initComponentAnimation(): void {
    gsap.to(this.textDecor.nativeElement, {
      scrollTrigger: {
        trigger: this.textDecor.nativeElement,
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none none' 
      },
      opacity: 1,
      duration: 1,
      y : 1
    });
  }
}
