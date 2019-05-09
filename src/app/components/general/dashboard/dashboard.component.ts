import { Component, OnInit, OnDestroy } from '@angular/core';
import { moveIn, fallIn } from 'src/app/shared/router.animation';

import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'shop-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'@moveIn': ''}
})
export class DashboardComponent implements OnInit, OnDestroy {
  state = '';
  statusLoading: boolean;
  viewRole: string;
  querySubscription: any;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.statusLoading = true;

    this.querySubscription = this.backendService.getUserStatus().subscribe((res: Array<any>) => {
      this.viewRole = res[1];
      this.statusLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.querySubscription) { this.querySubscription.unsubscribe(); }
  }

}
