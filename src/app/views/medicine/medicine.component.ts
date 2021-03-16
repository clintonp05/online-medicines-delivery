import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Subscription }   from 'rxjs';

import {MedicineService} from '../../services/medicine.service';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css'],
})
export class MedicineComponent implements OnInit {

  selectedMedSort: string;
  searchQuery : string;
  ascending : boolean = false;
  cartItems : any = [];

  subscription: Subscription;

  medicineList: any = [
    {
    "name" : "Benadryl",
    "category" : "liquid",
    "image" : "",
    "price": 185.25,
    "unit" : 10,
    "userRating" : 1.0
    },
    {
    "name" : "Dolo",
    "category" : "tablet",
    "image" : "",
    "price": 1.05,
    "unit" : 100,
    "userRating" : 2.5
    },
    {
    "name" : "Amoxycillin",
    "category" : "capsule",
    "image" : "",
    "price": 18.05,
    "unit" : 20,
    "userRating" : 4.0
    },
    {
      "name" : "Benadryl",
      "category" : "liquid",
      "image" : "",
      "price": 185.25,
      "unit" : 10,
      "userRating" : 4
      },
      {
      "name" : "Dolo",
      "category" : "tablet",
      "image" : "",
      "price": 1.05,
      "unit" : 100,
      "userRating" : 2.5
      },
      {
      "name" : "Amoxycillin",
      "category" : "capsule",
      "image" : "",
      "price": 18.05,
      "unit" : 20,
      "userRating" : 4.0
      },
      {
        "name" : "Benadryl",
        "category" : "liquid",
        "image" : "",
        "price": 185.25,
        "unit" : 10,
        "userRating" : 1.0
        },
        {
        "name" : "Dolo",
        "category" : "tablet",
        "image" : "",
        "price": 1.05,
        "unit" : 100,
        "userRating" : 2.5
        },
        {
        "name" : "Amoxycillin",
        "category" : "capsule",
        "image" : "",
        "price": 18.05,
        "unit" : 20,
        "userRating" : 4.0
        },
        {
          "name" : "Benadryl",
          "category" : "liquid",
          "image" : "",
          "price": 185.25,
          "unit" : 10,
          "userRating" : 4
          },
          {
          "name" : "Dolo",
          "category" : "tablet",
          "image" : "",
          "price": 1.05,
          "unit" : 100,
          "userRating" : 2.5
          },
          {
          "name" : "Amoxycillin",
          "category" : "capsule",
          "image" : "",
          "price": 18.05,
          "unit" : 20,
          "userRating" : 4.0
          }
    ];

  constructor(private medicineService: MedicineService, private cartService: CartService) {
    this.subscription = cartService.missionAnnounced$.subscribe(
      cartItems => {
        this.cartItems = cartItems;
    });
   }

  ngOnInit(): void {
    this.medicineService.getMedData(1).subscribe(
      res => this.medicineList = res.data,
      (error) => console.log('error ',error),
      () => this.initCartItemList()
      );
  }

  initCartItemList() : void {
    this.cartItems = this.medicineList.filter(item => item.userStockOrder > 0 );
    this.broadcastUpdateCartCount();
  }

  setSelectedMedSort( sortValue) : void {
    if( sortValue.includes("price") ) {
      this.ascending = sortValue[5] == '+' ? true : false;
      this.selectedMedSort = sortValue.slice(0, -1);
    } else {
      this.selectedMedSort = sortValue;
      this.ascending = false;
    } 
  }

  changeView(medObj) : void {
    medObj.showCartQuantView = true;
    medObj.userStockOrder = 0;
    this.addToCart(medObj,1);
  }

  addToCart(medObj, quantity) : void {
    if( medObj.userStockOrder < medObj.units ) {
      medObj.userStockOrder = medObj.userStockOrder + quantity;
      this.updateCart(medObj,'add');
    }
  }

  removeFromCart(medObj, quantity) : void {
    if( medObj.userStockOrder > 0 ){
      medObj.userStockOrder = medObj.userStockOrder - quantity;
      this.updateCart(medObj,'add');
    } 
    if( medObj.userStockOrder == 0 ) {
      medObj.userStockOrder = 0;
      medObj.showCartQuantView = false;
      this.updateCart(medObj,'sub');
    }
  }

  updateCart(medObj,operation) : void {
    let cartItem = medObj;
    const index = this.cartItems.findIndex(item => item.id == medObj.id);
    
    if( operation === 'add' ){
      if( index == -1 ) {
        this.cartItems.push(cartItem);
      } else {
        this.cartItems[index] = cartItem;
      }
    } else {
      this.cartItems.splice(index, 1);
    }
    this.broadcastUpdateCartCount();
  }

  broadcastUpdateCartCount() :void {
    let sum = 0;
    if( this.cartItems.length > 0 ) {
      sum  = this.cartItems.map(a => a.userStockOrder).reduce(function(a, b){return a + b;});
    } 
    this.cartService.updateCartCount(sum);
    if(sum >= 0){
      let response = this.cartService.updateCartAsync(this.cartItems);
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
