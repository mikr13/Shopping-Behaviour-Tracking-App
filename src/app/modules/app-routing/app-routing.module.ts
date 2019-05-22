
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../../components/general/home/home.component';
import { AboutusComponent } from '../../components/general/aboutus/aboutus.component';
import { SettingComponent } from '../../components/general/setting/setting.component';
import { LoginComponent } from '../../components/general/login/login.component';
import { DashboardComponent } from '../../components/general/dashboard/dashboard.component';
import { SetproductComponent } from './../../components/admin/setproduct/setproduct.component';
import { ProductsComponent } from './../../components/user/products/products.component';
import { SearchComponent } from './../../components/general/search/search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'settings', component: SettingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'setproduct', component: SetproductComponent},
  {path: 'search/:query', component: SearchComponent},
  {path: 'product/:id', component: ProductsComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
