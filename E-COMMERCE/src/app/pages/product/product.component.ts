import { Component, EventEmitter, Output } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { NgClass } from '@angular/common';
import { ShopCartComponent } from '../../components/shop-cart/shop-cart.component';
import { Product } from '../../models/Product';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-product',
  imports: [NavbarComponent, NgClass, ShopCartComponent, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  isMobileView : boolean = false;
  i : number = 1;
  sizes: string[] = ['Xs', 'X', 'M', 'L', 'Xl'];
  sizeSelected: string = '';
  isSizeSelected : boolean = false;
  showDialogMessage : boolean = false;
  showSizeDialog : boolean = false;
  productName : string = "";
  productPrice : number = 0;
  productId : number = 0;
  product : Product = {
    idProduct : 0,
    product : "",
    price : 0,
    category : "",
    stock : 0,
    brand : ""
  };
  @Output() productCart = new EventEmitter<Product>();
  

  constructor(private router: Router, private cartService : CartService, private route: ActivatedRoute, private productService : ProductService){
    this.checkScreenSize();
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { name: string; price: number, idProduct : number };
    if(state){
      this.productName = state.name;
      this.productPrice = state.price;
      this.productId = state.idProduct;
    }
    this.getProductInfo();
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  checkScreenSize(){
    this.isMobileView = window.innerWidth <= 768;
  }

  amountProduct(){
    if(this.i < 1){
      this.i = 1;
    }
  }

  showDialog(){
    this.showDialogMessage = true;
    setTimeout(() =>{
      this.showDialogMessage = false;
    },2000);
  }

  sizeDialog(){
    this.showSizeDialog = true;
    setTimeout(() =>{
      this.showSizeDialog = false;
    },2000);
  }

  sizeValidation(){
    if(this.sizeSelected !== ''){
      this.isSizeSelected = true;
      this.addProductCart();
      this.showDialog(); 
    }else{
      this.isSizeSelected = false;
      this.sizeDialog(); 
    }
  
    console.log('SIZE ---> ', this.sizeSelected);
    console.log('SIZE STATUS --->', this.isSizeSelected);
  }
  

  addProductCart(){
    const prodDetail : Product = {
      product : this.productName,
      price : this.productPrice,
      idProduct : this.productId,
      stock : this.i,
      brand : "",
      category : this.sizeSelected
    }
    console.log('producto agregado ---> ', prodDetail);
    this.cartService.addToCart(prodDetail);
  }

  getProductInfo(){
    const idProduct = this.route.snapshot.params['id'];
    console.log('ID RECIBIDO ---> ', idProduct);
    this.productService.getProductById(idProduct).subscribe({
      next: (res) =>{
          this.product = res.data;
          console.log("PRODUCTO ----> ", this.product);
      },
      error: (err) =>{
        console.log("NO SE ENCONTRO PRODUCTO CON ESE ID");
      }
    });
    
  }
}
