import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from 'src/app/shared/router.animation';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shop-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'@moveIn': ''}
})
export class AboutusComponent implements OnInit {
  state: string = '';

  constructor() { }

  ngOnInit() {
  }

}
