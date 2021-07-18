import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  previousKeyword: string = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( () => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts()
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // getting the category id from the route and converting to string using '+'
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      // setting the default id
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.pageNumber - 1,
      this.pageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());
  }

  private handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }
    this.previousKeyword = keyword;

    this.productService.searchProductsPaginate(this.pageNumber - 1,
      this.pageSize,
      keyword).subscribe(this.processResult());
  }

  private processResult() {
    return data => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }
}
