import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IndexComponent} from "./views/index/index.component";
import {NavComponent} from "./views/nav/nav.component";
import {NavService} from "./views/nav/nav.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { FooterComponent } from './views/footer/footer.component';
import { MedicineComponent } from './views/medicine/medicine.component';
import { MedSortPipe } from './pipes/med-sort.pipe';
import { MedSearchPipe } from './pipes/med-search.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './views/cart/cart.component';
import { OrderSuccessComponent } from './views/order-success/order-success.component';
import { OrdersComponent } from './views/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavComponent,
    FooterComponent,
    MedicineComponent,
    MedSortPipe,
    MedSearchPipe,
    CartComponent,
    OrderSuccessComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
