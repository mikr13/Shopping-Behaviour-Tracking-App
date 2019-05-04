import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { moveIn, fallIn } from 'src/app/shared/router.animation';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  newProductData = { category: '', subcategory: '', product: '', tags: '', description: '', price: '', maxdiscount: 0, extrataxes: 0};
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

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit() {
    this.toggleField = 'searchMode';
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
    console.log(data);
  }

  getData = () => {
    console.log('Clicked');
  }

}
