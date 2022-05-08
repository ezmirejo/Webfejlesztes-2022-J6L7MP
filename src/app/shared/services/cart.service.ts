import { collection, query, where } from "firebase/firestore";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, of } from 'rxjs';
import { Carpet } from '../models/carpet';
import { Cart } from '../models/cart';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { ref } from "@angular/fire/storage";
import { CarpetType } from "../models/carpet-type";
import { map } from "@firebase/util";
import { CartFormatPipe } from "../pipes/cart-formatter";
import { CarpetInCart } from "../models/carpet-in-cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  EMPTY_CART_OBSERVABLE = of({ userId: "Empty cart", carpetsInCart: new Array() } as Cart);

  collectionName = "Carts"
  user: firebase.default.User = {} as firebase.default.User;
  cartSubscription: Observable<Cart> = this.EMPTY_CART_OBSERVABLE;
  cart: Cart = {} as Cart;

  constructor(
    private afs: AngularFirestore,
    authService: AuthService,
    private cartFormatPipe: CartFormatPipe
  ) {
    authService.isUserLoggedIn().subscribe((user) => {
      if (user != null) {
        this.user = user;
        let query = this.afs.collection<Cart>(this.collectionName, ref => ref.where('userId', '==', user?.uid).limit(1));
        this.cartSubscription = this.cartFormatPipe.transform(query.valueChanges());
        query.get().subscribe(value => {
          if (value.empty) {
            this.addCart(this.createCart());
          }
        })

        this.cartSubscription.subscribe(cart => {
          this.cart = cart
        });
      }
      else {
          this.cartSubscription = this.EMPTY_CART_OBSERVABLE;
        }   
    });
  };

  public getCartForUser(): Observable<Cart> {
    return this.cartSubscription;
  }
  public addItemToCart(item: CarpetInCart) {
    let alreadyInCart = false;
    for (let itemInCart of this.cart?.carpetsInCart) {
      if (this.equalsCarpet(item.item, itemInCart.item)) {
        itemInCart.count += item.count;
        alreadyInCart = true;
      }
    }
    if (!alreadyInCart) {
      this.cart?.carpetsInCart.push(item)
    }
    this.afs.collection<Cart>(this.collectionName).doc(this.cart.userId).set(this.cart)
  }
  public removeItemFromCart(carpet: CarpetInCart) {
    this.cart.carpetsInCart = this.cart.carpetsInCart.filter((item) => {
      return !this.equals(carpet, item);
    })
    this.afs.collection<Cart>(this.collectionName).doc(this.cart.userId).set(this.cart)
  }

  public equals(left: CarpetInCart, right: CarpetInCart): boolean {
    return left.count == right.count && this.equalsCarpet(left.item, right.item)
  }

  private equalsCarpet(left: Carpet, right: Carpet): boolean {
    return left.height == right.height &&
      left.width == right.width &&
      left.name == right.name &&
      left.priceInHuf == right.priceInHuf &&
      left.type == right.type;
  }

  private createCart() :Cart{
    let cart = {} as Cart
    cart.userId = this.user.uid;
    cart.carpetsInCart = new Array();
    return cart;
  }
  private addCart(cart: Cart){
    return this.afs.collection<Cart>(this.collectionName).add(cart)
  }

  public calculateValue(cart: Cart): number {
    let sum = 0;
    for (let carpet of cart.carpetsInCart) {
      sum += carpet.count * carpet.item.priceInHuf;
    }
    return sum;
  }

  public emptyCart(){
    this.afs.collection<Cart>(this.collectionName).doc(this.cart.userId).set(this.createCart())
    this.createCart()
  }
}
