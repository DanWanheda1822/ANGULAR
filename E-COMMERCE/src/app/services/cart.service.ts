import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart : Product[] = [];
  private storageKey = 'cartProduct';

  constructor() { 
    this.loadCartFromStorage();
  }

  addToCart(product: Product){
    this.cart.push(product);
    this.saveCartToStorage();
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getCart(): Product[]{
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem(this.storageKey);
  }

  private loadCartFromStorage(){
    const data = localStorage.getItem(this.storageKey);
    if(data) {
      this.cart = JSON.parse(data);
    }
  }

  private saveCartToStorage(): void{
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
  }

  // cart.service.ts
  removeFromCart(product: Product) {
    const cart = this.getCart();
    const updatedCart = cart.filter(item => item.idProduct !== product.idProduct);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedCart));
    this.cart = updatedCart;
  }
  

}
