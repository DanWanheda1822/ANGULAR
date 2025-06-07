import { Component, HostListener, Input } from '@angular/core';
import { Product } from '../../models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  collapse: boolean = false;
  isMdOrLarger: boolean = false;
  filtersMobile: boolean = false;

  @Input()
  product!: Product;


  nameProduct: string = "";

  constructor(private router: Router) {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize(); // Verifica el tamaño de la pantalla al redimensionar
  }

  collapseButton() {
    this.collapse = !this.collapse;
    console.log('estado --> ', this.collapse);
  }

  checkScreenSize() {
    this.isMdOrLarger = window.innerWidth >= 767;
  }

  sendProdName() {
    const nameProduct = this.product.product;
    const priceProduct = this.product.price;
    const idProduct = this.product.idProduct;

    this.router.navigate(['/productInfo', idProduct], {
      state: { name: nameProduct, price: priceProduct, idProduct: idProduct } // ← aquí ajustado
    });

    console.log('Navegando a ProductInfo con:', nameProduct, ' and id ', idProduct);
  }
}
