import { Component, OnInit, Input } from '@angular/core';

import { BackendService } from 'src/app/services/backend.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'shop-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  @Input() userRole: string;
  interestData: any;
  statusLoading = false;
  viewRole: any;
  querySubscription: any;

  constructor(private backendService: BackendService, private authService: AuthService) { }

  ngOnInit() {
    this.statusLoading = true;

    this.querySubscription = this.authService.getUserStatus().subscribe((res: Array<any>) => {
      this.viewRole = res[1];
    });

    if (this.viewRole === 'admin') {
      this.backendService.getadminActivityData().subscribe((res: Array<any>) => {
        console.log(res);
        this.interestData = res;
        this.statusLoading = false;
      });
    } else {
      this.backendService.getuserShoppingInterestData().subscribe((res: Array<any>) => {
        this.interestData = res;
        this.statusLoading = false;
      });
    }
  }

}
