import { Component, OnInit, Input } from '@angular/core';

import { BackendService } from './../../services/backend.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'ShopEasy';
  @Input() pageTitle: string;
  @Input() iconTitle: string;
  @Input() activeToggle: string;
  @Input() helpText: string;
  counter: number;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.counter = 0;
    this.backendService.getCartTotal().subscribe(res => {
      this.counter = res;
    });
  }

}
