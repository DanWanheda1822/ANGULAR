import { Component, HostListener, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{
 

  isMobileScreen : boolean = false;

  constructor(){
    this.checkScreenSize();
    
  }

  ngAfterViewInit(){
    this.initAnimation();
  }

  @HostListener('window:resize',['$event'])
  onResize(){
    this.checkScreenSize();
  }

  checkScreenSize(){
    this.isMobileScreen = window.innerWidth <= 768;
  }


  @HostListener('window:scroll',['$'])
  onScroll(){
    this.checkElementsInView();
  }

  checkElementsInView() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
      const position = element.getBoundingClientRect();
      
      if (position.top >= 0 && position.bottom <= window.innerHeight) {

        element.classList.add('visible');
      }
    });
  }

 // @ViewChild('bannerOne') bannerOne! : ElementRef;
  @ViewChild('bannerTwo') bannerTwo! : ElementRef;
  @ViewChild('bannerThree') bannerThree! : ElementRef;
  @ViewChild('bannerFour') bannerFour! : ElementRef;

  initAnimation(){
    // gsap.to(this.bannerOne.nativeElement, {
    //   scrollTrigger : {
    //     trigger : this.bannerOne.nativeElement,
    //     start : '80%',
    //     end : '50%',
    //     scrub : 1
    //   },
    //   opacity : 1,
    //   y : 10
    // })

    gsap.to(this.bannerTwo.nativeElement, {
      scrollTrigger : {
        trigger : this.bannerTwo.nativeElement,
        start : '1%',
        end : '99%',
        scrub : 1,
      },
      duration : 4,
      opacity : 1,
    })

    gsap.to(this.bannerThree.nativeElement,{
      scrollTrigger : {
        trigger : this.bannerThree.nativeElement,
        scrub : 1,
        start : 'top 10%',
        end : 'botton 100%'
      },
      duration : 7,
      x : 15,
      opacity : 1
    })

    gsap.to(this.bannerFour.nativeElement, {
      scrollTrigger : {
        trigger : this.bannerFour.nativeElement,
        scrub: 1,
        start : '100%',
        end : '40%'
      },
      duration : 5,
      x : -10,
      opacity : 1
    })
    
  }
}
