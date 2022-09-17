import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../common/product";
import {map} from "rxjs/operators";
import {ProductCategory} from "../common/product-category";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.luv2shopApiUrl + '/products';

  private productCategoryUrl = environment.luv2shopApiUrl + '/product-category';

  constructor(private httpClient:HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl: string = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductListPaginate(page:number,
                         pageSize: number,
                         categoryId: number): Observable<GetResponseProducts> {
    const searchUrl: string = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
                              + `&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.productCategoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl: string = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(page:number,
                         pageSize: number,
                         keyword: string): Observable<GetResponseProducts> {
    const searchUrl: string = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`
      + `&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(productId: number): Observable<Product> {
    const productUrl: string = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page : {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
