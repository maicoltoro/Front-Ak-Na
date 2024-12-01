import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Product } from 'src/app/Interfaces/Product';
import { EndpointService } from 'src/app/services/endpoint/endpoint.service';
import { ProductService } from 'src/app/services/productservice';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {

  products: Product[] | undefined;
  paginatedProducts: any[] = [];
  first: number = 0;
  rows: number = 5;

  constructor(
    private endPointServices : EndpointService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  paginate(event: any): void {
    const start = event.first; 
    const end = start + event.rows;
    this.paginatedProducts = this.products!.slice(start, end);
  }

  redirectDetailProduct(product : Product){
    this.router.navigate(['product/products/detail'], { state: { product } });
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      let idCategory = params.get('category')?.toString(); 
      this.endPointServices.getServices(`Product/${idCategory}`)
          .subscribe((data) =>{
            this.products = data
           this.paginate({first : this.first,rows : this.rows})
          })      
    });
  }

}
