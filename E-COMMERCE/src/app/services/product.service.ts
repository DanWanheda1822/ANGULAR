import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private allProductsURL = "http://localhost:4142/api/v1/products/allproducts";
  private productsBrand = "http://localhost:4142/api/v1/products/find/brand?brand";
  private productsPrice = "http://localhost:4142/api/v1/products/find/price?maxPrice";
  private productsCategory = "http://localhost:4142/api/v1/products/find/category?category";
  private findProductId = "http://localhost:4142/api/v1/products/find/product";
  maxProducts : number = 8;

  constructor(private http: HttpClient) { }

  public productsInit(pageNumber: number): Observable<Response<Product[]>> {
    return this.http.get<Response<Product[]>>(
      this.allProductsURL + `?pageNumber=${pageNumber}&maxProducts=8`
    );
  }

  public getProductsBrand(brand: string, pageNumber: number): Observable<Response<Product[]>>{
    return this.http.get<Response<Product[]>>(
      this.productsBrand + `=${brand}&pageNumber=${pageNumber}&maxProducts=8`
    );
  }

  public getProductsPrice(minPrice: number, maxPrice: number, pageNumber: number){
    return this.http.get<Response<Product[]>>(
      this.productsPrice + `=${maxPrice}&minPrice=${minPrice}&pageNumber=${pageNumber}&maxProducts=8`
    );
  }

  public getProductsCategory(category: string, pageNumber : number){
    return this.http.get<Response<Product[]>>(
      this.productsCategory + `=${category}&pageNumber=${pageNumber}&maxProducts=8`
    );
  }

  public getProductById(id: number){
    return this.http.get<Response<Product>>(
      this.findProductId + `?idProduct=${id}`
    );
  }
}
