import { Component, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { BackendService } from 'src/app/services/backend.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'ShopEasy';
  @Input() pageTitle: string;
  @Input() iconTitle: string;
  @Input() activeToggle: string;
  @Input() helpText: string;
  counter: any = 0;
  userStatusColor = 'accent';
  userStatus = 'Login/Signup';
  userRole: string;
  adminView: boolean;
  roleCookie: any;
  private querySubscription: any;
  search: string;
  validator: RegExp;
  @Input() private cartUpdate: EventEmitter<any>;
  size: string;

  constructor(private backendService: BackendService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.search = 'Hey';
    this.querySubscription = this.backendService.getUserStatus().subscribe((res: Array<any>) => {
      this.userStatusColor = res[0] === 'true' ? 'primary' : 'accent';
      this.userStatus = res[0] === 'true' ? 'Your account section' : 'Login/Signup';
      this.userRole = res[1];
      if (this.userRole === 'admin') {
        this.adminView = true;
      } else {
        this.adminView = false;
        if (this.userRole === 'user' && res[0] === 'true') {
          this.backendService.getCartTotal().subscribe((res2: number) => {
            this.counter = res2;
          });
        }
      }
    });
    if (this.cartUpdate) {
      this.cartUpdate.subscribe((data: string) => {
        this.updateCart(data);
      });
    }
  }

  private updateCart = (data: any) => {
    if (data[0] === 'add') {
      this.counter = parseInt(this.counter, 10) + parseInt(data[1], 10);
    } else {
      this.counter = parseInt(this.counter, 10) - parseInt(data[1], 10);
    }
  }

  private navigate = (data: string) => {
    if (data.length === 0 || data === null) {
      return;
    } else {
      const validator = `^[a-z ]+$`;
      if (data.match(validator)) {
        data = data.split(' ').join('+');
        this.router.navigate([`search/:${data}`]);
      } else {
        data = data.replace(/[`~!@#$%^&*()+_|\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        data = data.split(' ').filter(el => el.length !== 0).join('+');
        this.router.navigate([`search/:${data}`]);
      }
    }
  }

  routeToProduct($event): void {
    this.search = $event.target.value;
    this.navigate(this.search);
  }

  openDialog(): void {
    if (this.search === undefined) { this.search = ''; }
    const dialogRef = this.dialog.open(DialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search = result;
      this.navigate(this.search);
    });
  }

  ngOnDestroy() {
    if (this.querySubscription) { this.querySubscription.unsubscribe(); }
  }

}
