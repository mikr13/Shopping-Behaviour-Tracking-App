import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { moveIn, fallIn } from 'src/app/shared/router.animation';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'shop-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '@moveIn': '', '@fallIn': '' }
})
export class HomeComponent implements OnInit, OnDestroy {
  state = '';
  statusLoading: boolean;
  viewRole: string;
  querySubscription: any;
  search: string;

  cards = [];

  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit() {
    this.statusLoading = true;

    this.querySubscription = this.backendService.getUserStatus().subscribe((res: Array<any>) => {
      this.viewRole = res[1];
    });

    this.querySubscription = this.backendService.getProducts('products').subscribe((data: any) => {
      this.cards = data;
      this.statusLoading = false;
    });
  }

  toggleProduct = (id: number) => {
    this.router.navigate([`product/:${id}`]);
  }

  ngOnDestroy(): void {
    if (this.querySubscription) { this.querySubscription.unsubscribe(); }
  }
}

