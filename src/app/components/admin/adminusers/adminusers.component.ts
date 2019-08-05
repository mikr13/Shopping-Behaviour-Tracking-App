import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { Orders } from './../../../shared/Orders';
import { BackendService } from 'src/app/services/backend.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'shop-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {
  updateOrderData: Orders;
  toggleField: string;
  userData = { userID: '', phone: '' };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  orders: Array<Orders>;
  order: any;
  displayedColumns = ['orderID', 'userID', 'phone', 'product', 'productID', 'productCount', 'cost', 'expectedDelivery', 'execContact', 'action'];
  snakbarInterval = 5000;
  paginationOption: Array<number>;
  dataLoading: boolean;
  formWait: boolean;
  private querySubscription: any;
  error: boolean;
  errMsg: any;
  viewRole: string;
  dataSource: MatTableDataSource<Orders>;

  constructor(private snackBar: MatSnackBar, private backendService: BackendService, private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.querySubscription = this.authService.getUserStatus().subscribe((res: Array<any>) => {
      this.viewRole = res[1];
    });

    if (this.viewRole !== 'admin') {
      this.router.navigate(['']);
    } else {
      this.toggleField = 'searchMode';
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataLoading = false;
    }
  }

  toggle = (filter?: any) => {
    if (!filter) {
      filter = 'searchMode';
    } else {
      filter = filter;
    }
    this.toggleField = filter;
  }

  getData = () => {
    this.dataLoading = true;
    this.querySubscription = this.backendService.getOrders('orders')
      .subscribe((data: Orders[]) => {
        this.orders = data;
        if (this.orders.length > 50) {
          this.paginationOption = [5, 10, 25, 50, 100];
        } else if (this.orders.length <= 50 && this.orders.length > 25) {
          this.paginationOption = [5, 10, 25, 50];
        } else if (this.orders.length <= 25 && this.orders.length > 10) {
          this.paginationOption = [5, 10, 25];
        } else if (this.orders.length <= 10 && this.orders.length > 5) {
          this.paginationOption = [5, 10];
        } else {
          this.paginationOption = [5];
        }
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (error: any) => {
        this.error = true;
        this.errMsg = error.message;
        this.dataLoading = false;
      }, () => {
        this.error = false;
        this.dataLoading = false;
      });
  }

  onSearchSubmit = (data: any) => {
    this.dataLoading = true;
    this.snackBar.open('Searching data');

    this.querySubscription = this.backendService.getOrders('order', data)
      .subscribe((result: any) => {
        if (Array.isArray(result)) {
          this.order = result;
          if (this.order.length > 50) {
            this.paginationOption = [5, 10, 25, 50, 100];
          } else if (this.order.length <= 50 && this.order.length > 25) {
            this.paginationOption = [5, 10, 25, 50];
          } else if (this.order.length <= 25 && this.order.length > 10) {
            this.paginationOption = [5, 10, 25];
          } else if (this.order.length <= 10 && this.order.length > 5) {
            this.paginationOption = [5, 10];
          } else {
            this.paginationOption = [5];
          }
          this.dataSource = new MatTableDataSource(this.order);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.order = result;
          this.paginationOption = [5];
          this.dataSource = new MatTableDataSource([this.order]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }

        this.snackBar.open(`Data search successfully`, 'OK', {
          duration: this.snakbarInterval
        });
        this.backendService.logAdminActivity('searchUserOrder', data);
      }, (error: any) => {
        this.error = true;
        this.errMsg = error.message;
        this.dataLoading = false;
      }, () => {
        this.error = false;
        this.dataLoading = false;
      });
  }

  getDoc = (orderID: string) => {
    this.formWait = true;
    this.snackBar.open('Please wait, data is loading!');

    this.querySubscription = this.backendService.getOrders('id', orderID)
      .subscribe((result: any) => {
        this.updateOrderData = result[0];
      }, (error: any) => {
        this.error = true;
        this.errMsg = error.message;
        this.dataLoading = false;
      }, () => {
        this.error = false;
        this.snackBar.open('Data loaded successfully', 'OK', {
          duration: this.snakbarInterval
        });
        this.formWait = false;
      });
  }

  onUpdateSubmit = (data: Orders) => {
    this.dataLoading = true;
    this.snackBar.open('Updating data');

    this.querySubscription = this.backendService.updateOrder(data)
      .subscribe((result: Orders[]) => {
        this.orders = result;
        if (this.orders.length > 50) {
          this.paginationOption = [5, 10, 25, 50, 100];
        } else if (this.orders.length <= 50 && this.orders.length > 25) {
          this.paginationOption = [5, 10, 25, 50];
        } else if (this.orders.length <= 25 && this.orders.length > 10) {
          this.paginationOption = [5, 10, 25];
        } else if (this.orders.length <= 10 && this.orders.length > 5) {
          this.paginationOption = [5, 10];
        } else {
          this.paginationOption = [5];
        }
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.snackBar.open(`Data saved successfully, Order id: ${data.orderID}`, 'OK', {
          duration: this.snakbarInterval
        });

        this.backendService.logAdminActivity('editUserOrder', data);
      }, (error: any) => {
        this.error = true;
        this.errMsg = error.message;
        this.dataLoading = false;
      }, () => {
        this.error = false;
        this.dataLoading = false;
      });
  }

  deleteDoc = (orderID: string) => {
    if (confirm(`Are you sure you want to delete data with orderID: ${orderID}`)) {
      this.dataLoading = true;
      this.snackBar.open(`Deleting data with orderID: ${orderID}`);
      for (const i of this.orders) {
        if (i.orderID === orderID) {
          this.backendService.logAdminActivity('deleteUserOrder', i);
          break;
        }
      }
      this.querySubscription = this.backendService.deleteOrder(orderID)
        .subscribe((data: Orders[]) => {
          this.orders = data;
          if (this.orders.length > 50) {
            this.paginationOption = [5, 10, 25, 50, 100];
          } else if (this.orders.length <= 50 && this.orders.length > 25) {
            this.paginationOption = [5, 10, 25, 50];
          } else if (this.orders.length <= 25 && this.orders.length > 10) {
            this.paginationOption = [5, 10, 25];
          } else if (this.orders.length <= 10 && this.orders.length > 5) {
            this.paginationOption = [5, 10];
          } else {
            this.paginationOption = [5];
          }
          this.dataSource = new MatTableDataSource(this.orders);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.snackBar.open(`Data deleted successfully.`, 'OK', {
            duration: this.snakbarInterval
          });
        }, (error: any) => {
          this.error = true;
          this.errMsg = error.message;
          this.dataLoading = false;
        }, () => {
          this.error = false;
          this.dataLoading = false;
        });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
