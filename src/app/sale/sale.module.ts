import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleComponent } from './sale/sale.component';
import { Sale1000Component } from './sale1000/sale1000.component';
import { Sale2000Component } from './sale2000/sale2000.component';
import { Sale3000Component } from './sale3000/sale3000.component';



@NgModule({
  declarations: [SaleComponent, Sale1000Component, Sale2000Component, Sale3000Component],
  imports: [
    CommonModule
  ]
})
export class SaleModule { }
