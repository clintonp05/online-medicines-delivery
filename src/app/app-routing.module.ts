import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from "./views/index/index.component";
import {CartComponent} from "./views/cart/cart.component";
import {OrderSuccessComponent} from "./views/order-success/order-success.component";
import { OrdersComponent } from './views/orders/orders.component';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: 'mycart', component: CartComponent},
  {path: 'orderSuccess', component: OrderSuccessComponent},
  {path: 'orders', component: OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
