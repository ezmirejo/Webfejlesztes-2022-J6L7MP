import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Pipe({
    name: 'toCart'
})
@Injectable({
    providedIn: 'root'
})
export class CartFormatPipe implements PipeTransform {

    transform(value: Observable<Array<Cart>> , ...args: unknown[]): Observable<Cart> {
        return value.pipe(map((carts => {
            return carts[0];
        })))
    }

}
