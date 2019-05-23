import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { moveIn, fallIn } from 'src/app/shared/router.animation';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'shop-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'@moveIn': ''}
})
export class ProductsComponent implements OnInit, OnDestroy {
  state = '';
  query: string;
  statusLoading: boolean;
  viewRole: string;
  querySubscription: any;
  result: any;
  counter: number;
  snackBarRef: any;
  imageCounter: number;
  cartUpdate: EventEmitter<any> = new EventEmitter();
  oldValue: number;

  constructor(route: ActivatedRoute, private backendService: BackendService, private snackBar: MatSnackBar, private router: Router) {
    this.query = route.snapshot.params.id;
    this.query = this.query.split(':')[1];
  }

  ngOnInit() {
    this.statusLoading = true;

    this.querySubscription = this.backendService.getUserStatus().subscribe((res: Array<any>) => {
      this.viewRole = res[1];
    });

    if (this.viewRole !== 'user') {
      this.router.navigate(['']);
    } else {
      this.querySubscription = this.backendService.getProducts('id', this.query).subscribe((data: any) => {
        this.result = data[0];
        this.backendService.logShoppingInterest('productClick', this.result);
        this.statusLoading = false;
      });

      this.imageCounter = 0;
      this.counter = 0;
    }
  }

  increaseImageCounter = () => {
    if (this.imageCounter >= this.result.images.length - 1) {
      this.imageCounter = 0;
    } else {
      this.imageCounter++;
    }
  }

  decreaseImageCounter = () => {
    if (this.imageCounter === 0) {
      this.imageCounter = this.result.images.length - 1;
    } else {
      this.imageCounter--;
    }
  }

  increaseCounter = () => {
    if (this.counter === 10) {
      return;
    } else {
      this.counter++;
    }
  }

  decreaseCounter = () => {
    if (this.counter === 0) {
      return;
    } else {
      this.counter--;
    }
  }

  addToCart = (id: string) => {
    this.snackBarRef = this.snackBar.open(`Added to cart ${this.counter} ${this.counter > 1 ? 'items' : 'item'}`, 'Undo', {
      duration: 4000
    });

    this.cartUpdate.emit(['add', this.counter]);
    const dataToSend = this.result;
    dataToSend.count = this.counter;
    this.backendService.logShoppingInterest('addCart', dataToSend);
    this.backendService.addRemoveCart('add', id, this.counter);
    this.oldValue = this.counter;
    this.counter = 0;

    this.snackBarRef.onAction().subscribe(() => {
      this.cartUpdate.emit(['sub', this.oldValue]);
      dataToSend.count = this.oldValue;
      this.backendService.logShoppingInterest('removeCart', dataToSend);
      this.backendService.addRemoveCart('remove', id, this.oldValue);
      this.snackBar.open('Removed from cart', 'Ok', {
        duration: 3000
      });
    });
  }

  ngOnDestroy(): void {
    if (this.querySubscription) { this.querySubscription.unsubscribe(); }
  }

}
