import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Product } from './../../../shared/Product';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'shop-setproduct',
  templateUrl: './setproduct.component.html',
  styleUrls: ['./setproduct.component.css']
})
export class SetproductComponent implements OnInit, OnDestroy {

  toggleField: string;
  productData = { category: '', product: '', fromDate: '', toDate: '' };
  newProductData: Product;
  updateProductData: Product;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = ['Example', 'Without-Space'];
  allTags: string[] = ['Formal-Shirt', 'Casual-Shirt', 'T-Shirt',
    'Formal-Trousers', 'Casual-Trousers', 'Jeans', 'Chinos', 'Joggers',
    'Watches', 'Smart-Watches', 'Braclets',
    'Belt', 'Purse', 'Tie',
    'Under-Garments', 'Night-Wear', 'Gym-Wear',
    'Headphones', 'Wireless-Headphones',
    'Spectacles', 'Sun-Glasses',
    'Casual-Shoes', 'Formal-Shoes', 'Loafers'];
  dataSource: MatTableDataSource<Product>;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['id', 'category', 'subcategory', 'product', 'tags', 'price', 'maxdiscount', 'extrataxes', 'action'];
  snakbarInterval = 5000;
  products: Array<Product>;
  product: any;
  paginationOption: Array<number>;
  dataLoading: boolean;
  formWait: boolean;
  private querySubscription: any;
  error: boolean;
  errMsg: any;
  viewRole: string;

  constructor(private snackBar: MatSnackBar, private backendService: BackendService, private router: Router) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit() {

    this.querySubscription = this.backendService.getUserStatus().subscribe((res: Array<any>) => {
      this.viewRole = res[1];
    });

    if (this.viewRole !== 'admin') {
      this.router.navigate(['']);
    } else {
      this.toggleField = 'searchMode';
      this.newProductData = { id: '', category: '', subcategory: '', product: '', tags: [], description: '', price: null, maxdiscount: null, extrataxes: null };
      this.updateProductData = { id: '', category: '', subcategory: '', product: '', tags: [], description: '', price: null, maxdiscount: null, extrataxes: null };
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.products);
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

  // SECTION mat-chip functions start
  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
  // !SECTION  mat-chip functions end

  // SECTION search function start
  onSearchSubmit = (data: any) => {
    this.dataLoading = true;
    this.snackBar.open('Searching data');

    this.querySubscription = this.backendService.getProducts('product', data)
      .subscribe((result: any) => {
        if (Array.isArray(result)) {
          this.product = result;
          if (this.product.length > 50) {
            this.paginationOption = [5, 10, 25, 50, 100];
          } else if (this.product.length <= 50 && this.product.length > 25) {
            this.paginationOption = [5, 10, 25, 50];
          } else if (this.product.length <= 25 && this.product.length > 10) {
            this.paginationOption = [5, 10, 25];
          } else if (this.product.length <= 10 && this.product.length > 5) {
            this.paginationOption = [5, 10];
          } else {
            this.paginationOption = [5];
          }
          this.dataSource = new MatTableDataSource(this.product);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.product = result;
          this.paginationOption = [5];
          this.dataSource = new MatTableDataSource([this.product]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }

        this.snackBar.open(`Data search successfully`, 'OK', {
          duration: this.snakbarInterval
        });
        this.backendService.logAdminActivity('searchProduct', data);
      }, (error: any) => {
        this.error = true;
        this.errMsg = error.message;
        this.dataLoading = false;
      }, () => {
        this.error = false;
        this.dataLoading = false;
      });
  }
  // !SECTION search function ends

  // SECTION add function start
  onAddSubmit = (data: any) => {
    this.dataLoading = true;
    data.tags = this.tags;
    this.snackBar.open('Saving data');

    this.querySubscription = this.backendService.saveNewProduct(data)
      .subscribe((result: Product[]) => {
        this.products = result;
        if (this.products.length > 50) {
          this.paginationOption = [5, 10, 25, 50, 100];
        } else if (this.products.length <= 50 && this.products.length > 25) {
          this.paginationOption = [5, 10, 25, 50];
        } else if (this.products.length <= 25 && this.products.length > 10) {
          this.paginationOption = [5, 10, 25];
        } else if (this.products.length <= 10 && this.products.length > 5) {
          this.paginationOption = [5, 10];
        } else {
          this.paginationOption = [5];
        }
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.snackBar.open(`Data saved successfully, Data id: ${this.products[this.products.length - 1].id}`, 'OK', {
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
  // !SECTION add function ends

  // SECTION update function start
  getDoc = (id: string) => {
    this.formWait = true;
    this.snackBar.open('Please wait, data is loading!');

    this.querySubscription = this.backendService.getProducts('id', id)
      .subscribe((result: any) => {
        this.updateProductData = result[0];
        this.tags = result[0].tags;
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

  onUpdateSubmit = (data: Product) => {
    this.dataLoading = true;
    data.tags = this.tags;
    this.snackBar.open('Updating data');

    this.querySubscription = this.backendService.updateProduct(data)
      .subscribe((result: Product[]) => {
        this.products = result;
        if (this.products.length > 50) {
          this.paginationOption = [5, 10, 25, 50, 100];
        } else if (this.products.length <= 50 && this.products.length > 25) {
          this.paginationOption = [5, 10, 25, 50];
        } else if (this.products.length <= 25 && this.products.length > 10) {
          this.paginationOption = [5, 10, 25];
        } else if (this.products.length <= 10 && this.products.length > 5) {
          this.paginationOption = [5, 10];
        } else {
          this.paginationOption = [5];
        }
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.snackBar.open(`Data saved successfully, Data id: ${data.id}`, 'OK', {
          duration: this.snakbarInterval
        });

        this.backendService.logAdminActivity('editProduct', data);
      }, (error: any) => {
        this.error = true;
        this.errMsg = error.message;
        this.dataLoading = false;
      }, () => {
        this.error = false;
        this.dataLoading = false;
      });
    this.tags = ['Example', 'Without-Space'];
  }
  // !SECTION update function ends

  // SECTION delete function start
  deleteDoc = (id: string) => {
    if (confirm(`Are you sure you want to delete data with id: ${id}`)) {
      this.dataLoading = true;
      this.snackBar.open(`Deleting data with id: ${id}`);
      for (const i of this.products) {
        if (i.id === id) {
          this.backendService.logAdminActivity('deleteProduct', i);
          break;
        }
      }
      this.querySubscription = this.backendService.deleteProduct(id)
        .subscribe((data: Product[]) => {
          this.products = data;
          if (this.products.length > 50) {
            this.paginationOption = [5, 10, 25, 50, 100];
          } else if (this.products.length <= 50 && this.products.length > 25) {
            this.paginationOption = [5, 10, 25, 50];
          } else if (this.products.length <= 25 && this.products.length > 10) {
            this.paginationOption = [5, 10, 25];
          } else if (this.products.length <= 10 && this.products.length > 5) {
            this.paginationOption = [5, 10];
          } else {
            this.paginationOption = [5];
          }
          this.dataSource = new MatTableDataSource(this.products);
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
  // !SECTION delete function ends

  // SECTION table functions start
  getData = () => {
    this.dataLoading = true;
    this.querySubscription = this.backendService.getProducts('products')
      .subscribe((data: Product[]) => {
        this.products = data;
        if (this.products.length > 50) {
          this.paginationOption = [5, 10, 25, 50, 100];
        } else if (this.products.length <= 50 && this.products.length > 25) {
          this.paginationOption = [5, 10, 25, 50];
        } else if (this.products.length <= 25 && this.products.length > 10) {
          this.paginationOption = [5, 10, 25];
        } else if (this.products.length <= 10 && this.products.length > 5) {
          this.paginationOption = [5, 10];
        } else {
          this.paginationOption = [5];
        }
        this.dataSource = new MatTableDataSource(this.products);
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

  // !SECTION table functions end

  ngOnDestroy(): void {
    // tslint:disable-next-line:no-unused-expression
    if (this.querySubscription) { this.querySubscription.unsubscribe(); }
  }
}
