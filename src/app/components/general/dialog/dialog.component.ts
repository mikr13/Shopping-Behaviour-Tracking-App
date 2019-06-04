import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { PhoneNumber } from '../../../shared/Phone';

@Component({
  selector: 'shop-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {

  phoneNumber = new PhoneNumber();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
