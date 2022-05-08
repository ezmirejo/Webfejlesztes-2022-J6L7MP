import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { Cart } from '../models/cart';
import { Order } from '../models/order';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  user: firebase.default.User = {} as firebase.default.User;
  EMPTY_ORDERS = of(new Array())
  orderSubsciption = this.EMPTY_ORDERS

  collectionName = "Orders"

  constructor(private afs: AngularFirestore,
    authService: AuthService, private cartService: CartService) {
    authService.isUserLoggedIn().subscribe((user) => {
      if (user != null) {
        this.user = user
        this.orderSubsciption = this.afs.collection<Order>(this.collectionName, ref => ref.where('cart.userId', '==', this.user?.uid)).valueChanges()
      }
      else {
        this.orderSubsciption = this.EMPTY_ORDERS;
      }
    })
  }

  makeOrder(cart: Cart) {
    let orderId = this.afs.createId()
    let order = { cart: cart, orderDate: new Date(), orderId: orderId } as Order
    this.afs.collection<Order>(this.collectionName).doc(orderId).set(order)
    this.cartService.emptyCart()
  }

  listOrders() {
    return this.orderSubsciption
  }
}
