import { Component, OnInit } from '@angular/core';
import { CarpetInCart } from '../models/carpet-in-cart';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService, private orderService: OrderService, private authService: AuthService) { }

  public loggedInUser = false;

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe((user) =>{
      if(user != null){
        this.loggedInUser = true;
      }
    })
  }

  removeCartItem(cartItem: CarpetInCart){
    this.cartService.removeItemFromCart(cartItem);
  }
  makeOrder(){
    this.orderService.makeOrder(this.cartService.cart)
  }

}
