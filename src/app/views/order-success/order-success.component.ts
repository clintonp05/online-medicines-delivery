import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  constructor(private router: Router, private cartService : CartService) { }

  ngOnInit() {
    this.cartService.updateCartCount(0);
  }

  gotoHome() {
    this.router.navigate(['/index'])
  }

}
