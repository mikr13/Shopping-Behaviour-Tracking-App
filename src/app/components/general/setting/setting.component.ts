import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { moveIn, fallIn } from 'src/app/shared/router.animation';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'shop-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'@moveIn': '', '@fallIn': ''}
})
export class SettingComponent implements OnInit, OnDestroy {
  state = '';
  statusLoading: boolean;
  viewRole: string;
  querySubscription: any;

  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit() {
    this.statusLoading = true;

    this.querySubscription = this.backendService.getUserStatus().subscribe((res: Array<any>) => {
      this.viewRole = res[1];
      this.statusLoading = false;
    });

    if (this.viewRole !== 'user') {
      this.router.navigate(['']);
    }
  }

  ngOnDestroy(): void {
    if (this.querySubscription) { this.querySubscription.unsubscribe(); }
  }

}
