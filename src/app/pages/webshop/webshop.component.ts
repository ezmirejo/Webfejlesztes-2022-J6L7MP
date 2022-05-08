import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-webshop',
  templateUrl: './webshop.component.html',
  styleUrls: ['./webshop.component.scss']
})
export class WebshopComponent implements OnInit {

  constructor() { }

  public loggedInUser = false;

  ngOnInit(): void {

  }

}
