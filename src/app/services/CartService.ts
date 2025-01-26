import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    private cartItemsSubject = new BehaviorSubject<number>(this.getCartItemCount());
    cartItems$ = this.cartItemsSubject.asObservable();

    constructor() { }

    private getCartItemCount(): number {
        const products = JSON.parse(sessionStorage.getItem('product') || '[]');
        return products.length;
    }

    updateCartCount() {
        const count = this.getCartItemCount();
        this.cartItemsSubject.next(count);
    }
}