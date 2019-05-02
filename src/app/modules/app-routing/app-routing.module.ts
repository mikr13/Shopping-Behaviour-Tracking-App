
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../../components/home/home.component';
import { AboutusComponent } from '../../components/aboutus/aboutus.component';
import { SettingComponent } from '../../components/setting/setting.component';
import { LoginComponent } from './../../components/login/login.component';
import { DashboardComponent } from './../../components/dashboard/dashboard.component';
import { SetproductComponent } from './../../components/admin/setproduct/setproduct.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'settings', component: SettingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'setproduct', component: SetproductComponent},
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
