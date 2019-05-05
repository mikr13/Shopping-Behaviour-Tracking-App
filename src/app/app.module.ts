import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/general/login/login.component';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { AboutusComponent } from './components/general/aboutus/aboutus.component';
import { HomeComponent } from './components/general/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingComponent } from './components/general/setting/setting.component';
import { DashboardComponent } from './components/general/dashboard/dashboard.component';
import { SetproductComponent } from './components/admin/setproduct/setproduct.component';
import { AdminordersComponent } from './components/admin/adminorders/adminorders.component';
import { AdminusersComponent } from './components/admin/adminusers/adminusers.component';
import { OrdersComponent } from './components/user/orders/orders.component';
import { CartsComponent } from './components/user/carts/carts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AboutusComponent,
    HomeComponent,
    SettingComponent,
    DashboardComponent,
    SetproductComponent,
    AdminordersComponent,
    AdminusersComponent,
    OrdersComponent,
    CartsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
