import { Component, OnInit } from '@angular/core';
import { ClarityModule } from '@clr/angular';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'shop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'ShopEasy';

  constructor() { }

  ngOnInit() {
  }

}
