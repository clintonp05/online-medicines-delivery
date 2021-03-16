import { Injectable } from '@angular/core';
import { Observable, Subject }    from 'rxjs';
import {publishReplay, refCount} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartSize : any
  cartItems : any = [];

  constructor(private httpClient: HttpClient) { }


  getCartSize() : void {
    return this.cartSize;
  }

  setCartSize(cartSize) : void {
    this.cartSize = cartSize ;
  }

  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  private updateCartCountSource = new Subject<string>();

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  updateCartCount$ = this.updateCartCountSource.asObservable();

  // Service message commands
  announceMission(mission: any) {
    this.missionAnnouncedSource.next(mission);
  }

  updateCartCount(cartCount: any) {
    this.updateCartCountSource.next(cartCount);
  }

  updateCartAsync(cartItems : any) : Observable<any>  {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    let response = this.httpClient.put(environment.serverUrl + 'cart/1',JSON.stringify({'itemList' : cartItems}),{ headers }).subscribe({
      next: data => {
        return data;
    },
    error: error => {
        console.error('There was an error!', error);
        return null;
    }
    });
    return null;   
  }

  getCart() :Observable<any>  {
    return this.httpClient.get(environment.serverUrl + 'cart/1');  
  }

  checkoutCart(payload) : Observable<any>  {
    return this.httpClient.post(environment.serverUrl + 'checkoutCart',JSON.stringify(payload));  
  }
}
