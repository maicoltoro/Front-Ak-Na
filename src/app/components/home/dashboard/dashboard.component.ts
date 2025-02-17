import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from 'src/app/Interfaces/Categories';
import { ImagenesProyecto, Product } from 'src/app/Interfaces/Product';
import { EndpointService } from 'src/app/services/endpoint/endpoint.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    categories: Categories[] | undefined
    UltimosProdcutos: Product[] = []
    productDatil: Product | null = null
    isModalVisible: boolean = false;
    UrlImagenes: ImagenesProyecto[] | undefined

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
        await this.getTraerImagenes(1)
        await this.getCategories()
        await this.UltimosProductos()
    }

    getTraerImagenes(id: number) {
        this.endPoinServices.getServices(`google/TraerImagenes/${id}`)
            .subscribe((data) => {
                if (data.status == 200) {
                    this.UrlImagenes = data.response
                }
            })
    }

    getCategories() {
        this.endPoinServices.getServices('Categories')
            .subscribe((data) => {
                if (data.status == 200) {
                    this.categories = data.response
                }
            })
    }

    UltimosProductos() {
        this.endPoinServices.getServices('Product/Ultimos/Productos')
            .subscribe((data) => {
                if (data.status == 200) {
                    this.UltimosProdcutos = data.response
                }
            })
    }

    redirectCategory(event: Categories) {
        this.router.navigate(['product', event.ID])
    }

    showDialog(prodcut: Product) {
        this.productDatil = prodcut
        this.isModalVisible = true;
    }

    getBannerUrl() {
        return this.UrlImagenes?.filter(e => e.LugarImagen === "Banner")[0]?.UrlImagen;
    }

    getLogoUrl() {
        return this.UrlImagenes?.filter(e => e.LugarImagen === "Logo")[0]?.UrlImagen;
    }

    getHierbasUrl() {
        return this.UrlImagenes?.filter(e => e.LugarImagen === "HierbasMedicinales")[0]?.UrlImagen;
    }

    getProductosUrl() {
        return this.UrlImagenes?.filter(e => e.LugarImagen === "ProductosOrganicos")[0]?.UrlImagen;
    }

    getConsejeriaUrl() {
        return this.UrlImagenes?.filter(e => e.LugarImagen === "Consejeria")[0]?.UrlImagen;
    }
    getSobreNosotrosUrl() {
        return this.UrlImagenes?.filter(e => e.LugarImagen === "SobreNosotros")[0]?.UrlImagen;
    }
}
