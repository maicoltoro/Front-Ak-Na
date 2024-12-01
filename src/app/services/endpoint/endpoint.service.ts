import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { environment } from "src/app/environment/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class EndpointService {
    
    constructor(
        private http : HttpClient
    ){}

    private getUrlApi(url: string){
        return `${environment.url}/${url}`
    }

    getServices(url:string , option?:any) :Observable<any>   {
        return this.http.get(this.getUrlApi(url), option)
    }

    postServices(url:string , body:any, option? : any ): Observable<any>{
        return this.http.post(this.getUrlApi(url),body,option)
    }
}