import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BackendService } from 'src/app/services/backend.service';

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
  @Output() viewEvent = new EventEmitter<string>();
  counter: number;
  userStatusColor: string;
  userStatus: string;
  userRole: string;
  adminView: boolean;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.counter = 0;
    this.userStatusColor = 'accent';
    this.userStatus = 'Login/Signup';

    this.backendService.getUserStatus().subscribe((res: Array<any>) => {
      this.userStatusColor = res[0] ? 'primary' : 'accent';
      this.userStatus = res[0] ? 'Your account section' : 'Login/Signup';
      this.userRole = res[1];
      this.viewEvent.emit(this.userRole);
      if (this.userRole === 'admin') {
        this.adminView = true;
      } else {
        this.adminView = false;
        this.backendService.getCartTotal().subscribe((res: number) => {
          this.counter = res;
        });
      }
    });
  }

}
