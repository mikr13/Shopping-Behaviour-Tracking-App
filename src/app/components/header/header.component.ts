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
  userStatusColor: string;
  userStatus: string;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.counter = 0;
    this.userStatusColor = 'accent';
    this.userStatus = 'Login/Signup';

    this.backendService.getCartTotal().subscribe((res: number) => {
      this.counter = res;
    });

    this.backendService.getUserStatus().subscribe((res: boolean) => {
      this.userStatusColor = res ? 'primary' : 'accent';
      this.userStatus = res ? 'Your account section' : 'Login/Signup';
    });
  }

}
