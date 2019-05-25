import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/general/login/login.component';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { AboutusComponent } from './components/general/aboutus/aboutus.component';
import { HomeComponent } from './components/general/home/home.component';
import { SettingComponent } from './components/general/setting/setting.component';
import { DashboardComponent } from './components/general/dashboard/dashboard.component';
import { SetproductComponent } from './components/admin/setproduct/setproduct.component';
import { AdminordersComponent } from './components/admin/adminorders/adminorders.component';
import { AdminusersComponent } from './components/admin/adminusers/adminusers.component';
import { OrdersComponent } from './components/user/orders/orders.component';
import { CartsComponent } from './components/user/carts/carts.component';
import { ActivitiesComponent } from './components/general/activities/activities.component';
import { ProductsComponent } from './components/user/products/products.component';
import { DialogComponent } from './components/general/dialog/dialog.component';
import { SearchComponent } from './components/general/search/search.component';

@NgModule({
  entryComponents: [
    DialogComponent
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AboutusComponent,
    HomeComponent,
    DialogComponent,
    SettingComponent,
    DashboardComponent,
    SetproductComponent,
    AdminordersComponent,
    AdminusersComponent,
    OrdersComponent,
    CartsComponent,
    ActivitiesComponent,
    ProductsComponent,
    DialogComponent,
    SearchComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
