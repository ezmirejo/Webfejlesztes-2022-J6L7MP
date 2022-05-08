import { Component, OnInit,  Input, Output, EventEmitter  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Carpet } from '../models/carpet';
import { CarpetInCart } from '../models/carpet-in-cart';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {


  countForm = new FormGroup({
    count: new FormControl(1)
  });

  @Input() public carpet: Carpet = {} as Carpet;
  @Output() addToCartEvent = new EventEmitter<CarpetInCart>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    let count = this.countForm.get("count")?.value
    if(this.isNumber(count) && count > 0){
      let carpetInCart = {count : count, item : this.carpet} as CarpetInCart
      this.addToCartEvent.emit(carpetInCart)
    }

  }
  isNumber(value: string | number): boolean
  {
    return ((value != null) &&
            (value !== '') &&
            !isNaN(Number(value.toString())));
  }

}
