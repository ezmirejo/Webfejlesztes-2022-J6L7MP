import { Component, OnInit } from '@angular/core';
import { CarpetService } from 'src/app/shared/services/carpet.service';
import { CarpetInCart } from '../models/carpet-in-cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-item-lister',
  templateUrl: './item-lister.component.html',
  styleUrls: ['./item-lister.component.scss']
})
export class ItemListerComponent implements OnInit {

  constructor(public carpetService:CarpetService, public cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(carpetInCart: CarpetInCart){
      this.cartService.addItemToCart(carpetInCart)
  }
}
