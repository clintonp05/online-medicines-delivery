import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"


import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService]
})
export class CartComponent implements OnInit {

  cart : any;
  totalSum : any = 0;
  checkoutView : boolean = false;
  userInfo : any = {
    'name' : '',
    'email' : '',
    'address' : '',
    'state' : '',
    'city' : ''
  }
  cartValue : number = 0;
  constructor( private cartService : CartService,private router: Router) {}

  ngOnInit() :void {
    this.cartService.getCart().subscribe(
      res => this.cart = res.data,
      (error) => console.log('error ',error),
      () => this.broadcastUpdateCartCount()
    );
  }

  broadcastUpdateCartCount() :void {
    let sum = 0;
    if( this.cart.cartItemList.length > 0 ) {
      sum  = this.cart.cartItemList.map(a => a.itemUserStockOrder).reduce(function(a, b){return a + b;});
      this.totalSum = sum  = this.cart.cartItemList.map(a => a.itemPrice).reduce(function(a, b){return a + b;}).toFixed(2);
    } 
    this.cartService.updateCartCount(sum);
  }

  getSubTotal(sum : number) : number {
    var y: number = +sum;
    y = y + (y*0.18);
    this.cartValue = y;
    return y;
  }

  checkoutCart() : void{
    this.checkoutView = true;
  }

  placeOrder():void {
    this.cartService.updateCartCount(0);
    this.cartService.checkoutCart({'cartId' : this.cart.cartId,'userInfo' : this.userInfo,'cartValue' : this.cartValue}).subscribe(res => 
      this.router.navigate(['/orderSuccess']),
      (error) => console.log('error ',error)
    );
  }

  gotoHome() {
    this.router.navigate(['/index'])
  }

}
