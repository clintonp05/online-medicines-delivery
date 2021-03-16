import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList : any = []
  constructor(private orderService: OrderService,private router: Router) { }

  ngOnInit(): void {
    this.initData();
  }

  initData() : void{
    this.orderService.getOrder(1).subscribe(
      res => this.orderList = res.data,
      (error) => console.log('error ',error),
      () => console.log('callback called '+this.orderList)
      );
  }

  gotoHome() {
    this.router.navigate(['/index'])
  }  

}
