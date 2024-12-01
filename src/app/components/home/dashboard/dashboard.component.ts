import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from 'src/app/Interfaces/Categories';
import { Product } from 'src/app/Interfaces/Product';
import { EndpointService } from 'src/app/services/endpoint/endpoint.service';
import { ProductService } from 'src/app/services/productservice';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    categories: Categories[] | undefined

    responsiveOptions: any[] | undefined;
    constructor(
        private router: Router,
        private endPoinServices: EndpointService
    ) { }

    ngOnInit() {
        this.getMetodos()
        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    async getMetodos() {
        await this.getCategories()
    }

    getCategories() {
        this.endPoinServices.getServices('Categories')
            .subscribe((data) => {
                this.categories = data
            })
    }

    redirectCategory(event: Categories) {
        this.router.navigate(['product', event.ID])
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'danger';
        }
    }

}
