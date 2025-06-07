import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/Product';
import { ProductCartDetailComponent } from "../../components/product-cart-detail/product-cart-detail.component";

@Component({
  selector: 'app-shopcar',
  imports: [NavbarComponent, ProductCartDetailComponent],
  templateUrl: './shopcar.component.html',
  styleUrl: './shopcar.component.css'
})
export class ShopcarComponent {


  isMobileView : boolean = false;
  carItems : Product[] = []
  totalAmount : number = 0;
  total : number = 0;
  tax : number = 0.15;
  totalTax : number = 0;
  i : number = 0;
  constructor(private cartService : CartService){
    this.checkScreenSize();
  }

  ngOnInit(){
  this.carItems = this.cartService.getCart();
  this.calculateTotal();    
  console.log('products en carrito ---> ', this.carItems);
  }

  checkScreenSize(){
    this.isMobileView = innerWidth <= 768;
  }

  showProductList(){
    console.log('PRODUCT ------> ', this.carItems);
  }

  removeProductFromCart(product: Product) {
    this.carItems = this.carItems.filter(item => item.idProduct !== product.idProduct);
    this.cartService.removeFromCart(product);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = 0;  // Reiniciamos el total para evitar acumulación
    for (this.i = 0; this.i < this.carItems.length; this.i++) {
      const product = this.carItems[this.i];
      this.totalAmount += product.price * product.stock;  // Calcular el precio total con el stock
    }
    this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
    this.totalTax = parseFloat((this.totalAmount * this.tax).toFixed(2));
    this.total = parseFloat((this.totalAmount + this.totalTax).toFixed(2));
    console.log('Total (con tax) ---> ', this.total);
  }
}
