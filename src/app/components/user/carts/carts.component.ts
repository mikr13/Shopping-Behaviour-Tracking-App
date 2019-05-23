import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { moveIn, fallIn } from 'src/app/shared/router.animation';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'shop-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'@moveIn': ''}
})
export class CartsComponent implements OnInit, OnDestroy {
  state = '';
  query: string;
  statusLoading: boolean;
  viewRole: string;
  querySubscription: any;
  cartData: any;

  constructor(private backendService: BackendService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.statusLoading = true;

    this.querySubscription = this.backendService.getUserStatus().subscribe((res: Array<any>) => {
      this.viewRole = res[1];
    });

    this.querySubscription = this.backendService.getCart().subscribe((res: Array<any>) => {
      this.cartData = res;
      this.statusLoading = false;
    });

    if (this.viewRole === 'admin') {
      this.router.navigate(['']);
    }
  }

  deleteFromCart = (id: string) => {
    this.backendService.addRemoveCart('remove', id);
    this.snackBar.open(`Item removed from cart`, 'OK', {
      duration: 3000
    });

    for (const i of this.cartData) {
      if (i.item.id === id) {
        this.backendService.logShoppingInterest('remove-cart', i.item);
        break;
      }
    }

  }

  ngOnDestroy() {
    if (this.querySubscription) { this.querySubscription.unsubscribe(); }
  }

}
