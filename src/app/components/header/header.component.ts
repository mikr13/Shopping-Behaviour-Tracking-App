import { Component, OnInit, Input } from '@angular/core';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'ShopEasy';
  @Input() pageTitle: string;

  constructor() { }

  ngOnInit() {
  }

}
