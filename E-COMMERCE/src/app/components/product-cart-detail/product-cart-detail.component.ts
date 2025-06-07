import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-cart-detail',
  imports: [],
  templateUrl: './product-cart-detail.component.html',
  styleUrl: './product-cart-detail.component.css'
})
export class ProductCartDetailComponent {

  @Input() productData! : Product;
  @Output() deleteProductEvent = new EventEmitter<Product>();

  deleteProduct() {
    this.deleteProductEvent.emit(this.productData);
  }

}
