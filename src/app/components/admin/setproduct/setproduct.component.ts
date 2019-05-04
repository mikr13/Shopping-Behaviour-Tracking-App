import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { moveIn, fallIn } from 'src/app/shared/router.animation';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Product } from './../../../shared/Product';

/** Constants used to fill up our data base. */
const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

@Component({
  selector: 'shop-setproduct',
  templateUrl: './setproduct.component.html',
  styleUrls: ['./setproduct.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'@moveIn': ''}
})
export class SetproductComponent implements OnInit {

  state = '';
  toggleField: string;
  productData = { category: '', product: '', fromDate: '', toDate: '' };
  newProductData: Product;
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
  displayedColumns = ['id', 'category', 'subcategory', 'product', 'tags', 'description', 'price', 'maxdiscount', 'extrataxes', 'action'];
  dataSource: MatTableDataSource<Product>;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  snakbarInterval = 5000;
  dummy: Array<Product>;
  paginationOption: Array<number>;

  constructor(private snackBar: MatSnackBar) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
    // Create 100 dummy
    this.dummy = Array.from({length: 50}, (_, k) => this.createNewDummy(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.dummy);

    if(this.dummy.length > 50) {
      this.paginationOption = [5, 10, 25, 50, 100];
    } else if (this.dummy.length <= 50 && this.dummy.length > 25) {
      this.paginationOption = [5, 10, 25, 50];
    } else if (this.dummy.length <= 25 && this.dummy.length > 10) {
      this.paginationOption = [5, 10, 25];
    } else if (this.dummy.length <= 10 && this.dummy.length > 5) {
      this.paginationOption = [5, 10];
    } else {
      this.paginationOption = [5];
    }
  }

  ngOnInit() {
    this.toggleField = 'searchMode';
    this.newProductData = { id: '', category: '', subcategory: '', product: '', tags: [], description: '', price: null, maxdiscount: null, extrataxes: null };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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

  toggle = (filter?: any) => {
    if (!filter) {
      filter = 'searchMode';
    } else {
      filter = filter;
    }
    this.toggleField = filter;
  }

  onSearchSubmit = (data?: any) => {
    console.log(data);
  }

  onAddSubmit = (data?: any) => {
    data.tags = this.tags;

    const snackBarRef = this.snackBar.open('Data saved successfully', 'View Data', {
      duration: this.snakbarInterval
    });

    // snackBarRef.afterDismissed().subscribe(() => {
    //   console.log('The snack-bar was dismissed');
    // });

    snackBarRef.onAction().subscribe(() => {
      alert(JSON.stringify(data));
    });
  }

  onUpdateSubmit = (data?: any) => {

    const snackBarRef = this.snackBar.open('Data updated successfully', 'View Data', {
      duration: this.snakbarInterval
    });

    // snackBarRef.afterDismissed().subscribe(() => {
    //   console.log('The snack-bar was dismissed');
    // });

    snackBarRef.onAction().subscribe(() => {
      alert(JSON.stringify(data));
    });
  }

  getData = () => {
    setTimeout(() => {
      this.refreshDataSource();
    }, 200);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshDataSource = () => {
    this.dataSource = new MatTableDataSource(this.dummy);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Builds and returns a new User. */
  createNewDummy = (id: number) => {

    const data: Product = {
      id: id.toString(),
      category: 'Clothing',
      subcategory: 'T-Shirt',
      product: 'TEAR raindrop tees',
      tags: ['nice', 'cute'],
      description: 'dbfiufhwwid wihdfwiuheidefue euhwfihfivudiuevh iudvowhinwihvniwuh',
      price: Math.floor((Math.random() * 10000) + 1),
      maxdiscount: Math.floor((Math.random() * 40) + 1),
      extrataxes: Math.floor((Math.random() * 20) + 1)
    };

    return data;
  }
}
