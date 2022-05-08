import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { MatListModule } from '@angular/material/list';
import { DateFormatPipe } from 'src/app/shared/pipes/date-formatter';

@NgModule({
  declarations: [
    OrderComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MatListModule
  ]
})
export class OrderModule { }
