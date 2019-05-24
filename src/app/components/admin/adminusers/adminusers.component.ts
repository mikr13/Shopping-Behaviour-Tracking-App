import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { Orders } from './../../../shared/Orders';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'shop-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {

  toggleField: string;
  userData = {userID: '', phone: ''};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  orders: Array<Orders>;
  member: any;
  displayedColumns = ['orderID', 'userID', 'phone', 'product', 'productID', 'productCount', 'cost', 'expectedDelivery', 'execContact'];
  snakbarInterval = 5000;
  paginationOption: Array<number>;
  dataLoading: boolean;
  formWait: boolean;
  private querySubscription: any;
  error: boolean;
  errMsg: any;
  viewRole: string;
  dataSource: MatTableDataSource<Orders>;

  constructor(private snackBar: MatSnackBar, private backendService: BackendService, private router: Router) { }

  ngOnInit() {

    this.querySubscription = this.backendService.getUserStatus().subscribe((res: Array<any>) => {
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

  onSearchSubmit = (data: any) => {
    this.dataLoading = true;
    this.snackBar.open('Searching data');

    this.querySubscription = this.backendService.getOrders('order', data)
      .subscribe((result: any) => {
        if (Array.isArray(result)) {
          this.member = result;
          if (this.member.length > 50) {
            this.paginationOption = [5, 10, 25, 50, 100];
          } else if (this.member.length <= 50 && this.member.length > 25) {
            this.paginationOption = [5, 10, 25, 50];
          } else if (this.member.length <= 25 && this.member.length > 10) {
            this.paginationOption = [5, 10, 25];
          } else if (this.member.length <= 10 && this.member.length > 5) {
            this.paginationOption = [5, 10];
          } else {
            this.paginationOption = [5];
          }
          this.dataSource = new MatTableDataSource(this.member);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.member = result;
          this.paginationOption = [5];
          this.dataSource = new MatTableDataSource([this.member]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }

        this.snackBar.open(`Data search successfully`, 'OK', {
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

  getData = () => {
    this.dataLoading = true;
    this.querySubscription = this.backendService.getOrders('orders')
      .subscribe((data: any) => {
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
