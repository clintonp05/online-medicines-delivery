import {Component} from '@angular/core';
import {NavService} from './nav.service';
import {CartService} from '../../services/cart.service';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit   {

  applicationData: any;
  cartSize : any  ;
  navExpanded: boolean;
  
  constructor(private navService: NavService,private cartService: CartService) {
    cartService.updateCartCount$.subscribe(
      cartCount => {
        this.cartSize = cartCount;
      });
   }

  ngOnInit(): void {
    this.navService.getNavData().subscribe(res => this.applicationData = res);
  }
}
