import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { CardComponent } from '../../components/card/card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-clothing',
  standalone: true,
  imports: [
    NavbarComponent,
    FiltersComponent,
    CardComponent,
  ],
  templateUrl: './clothing.component.html',
  styleUrls: ['./clothing.component.css']
})
export class ClothingComponent {

  isMobile: boolean = false;
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  pageNumber: number = 1;
  products: Product[] = [];
  test: number = 2;
  brand : string = "";
  minPrice : number = 0;
  maxPrice : number = 0;
  mobileProd : number = 5; 

  constructor(private productService: ProductService) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.getAllProducts(this.pageNumber);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  getAllProducts(pageNumber: number) {
    if (pageNumber < 1) {
      pageNumber = 1; // Evitar páginas negativas
    }
    this.pageNumber = pageNumber;
    this.productService.productsInit(this.pageNumber).subscribe({
      next: (res) => {
        this.products = Array.isArray(res.data) ? res.data : []; // Asegúrate de que sea un array
        console.log("Productos:", this.products);
      },
      error: (err) => {
        console.error("Error al obtener productos:", err);
      }
    });
  }

  getProductsBrand(brand: string, pageNumber: number) {
    if (pageNumber < 1) {
      pageNumber = 1;
    }
    this.pageNumber = pageNumber;
    this.productService.getProductsBrand(brand, pageNumber).subscribe(
      {
        next: (res) => {
          this.products = Array.isArray(res.data) ? res.data : []; //verificar si es un array
        },
        error: (err) => {
          console.log("ERROR AL OBTENER PRODUCTOS POR MARCA ", err);
        }
      }
    );
  }

  getProductsPrice(minPrice : number, maxPrice: number , pageNumber : number){
    this.productService.getProductsPrice(minPrice,maxPrice,pageNumber).subscribe(
      {
        next: (res) =>{
          this.products = Array.isArray(res.data) ? res.data : [];  
        },
        error: (err) => {
          console.log('ERROR PRODUCTS BY PRICE ---> ', err);
        }
      }
    );
  }

  getProductsCategory(category: string, pageNumber: number){
    this.productService.getProductsCategory(category,pageNumber).subscribe(
      {
        next : (res) => {
          this.products = Array.isArray(res.data) ? res.data : [];
        },
        error : (err) =>{
          console.log('ERROR PRODUCTS BY CATEGORY ---> ',err );
        }
      }
    );
  }

  filterBrand(brand: string, pageNumber: number) {
    this.brand = brand;
    console.log('FILTER FROM CLOTHING HTML ---->', this.brand);
    if (pageNumber < 1) {
      pageNumber = 1;
    }
    this.pageNumber = pageNumber;
    this.getProductsBrand(this.brand, this.pageNumber);
  }

  filterPrice(price: string, pageNumber: number){
    console.log('recibido desde filtro --->', price)
    if (pageNumber < 1) {
      pageNumber = 1;
    }
    this.pageNumber = pageNumber;
    if(price === "low"){
      this.minPrice = 1;
      this.maxPrice = 100; 
    } else if(price === "mid"){
      this.minPrice = 100;
      this.maxPrice = 500;
    } else if(price === "high"){
      this.minPrice = 500;
      this.maxPrice = 1000;
    } else if(price === "ultraHigh"){
      this.minPrice = 1000;
      this.maxPrice = 1000000;
    }
    console.log('min price -->', this.minPrice);
    console.log('max price ---> ', this.maxPrice);
    this.getProductsPrice(this.minPrice, this.maxPrice, this.pageNumber);
  }

  atun(category: string, pageNumber : number){
    console.log('Category recived ---> ', category);
    if (pageNumber < 1) {
      pageNumber = 1;
    }
    this.pageNumber = pageNumber;
    this.getProductsCategory(category, pageNumber);
  }
}
