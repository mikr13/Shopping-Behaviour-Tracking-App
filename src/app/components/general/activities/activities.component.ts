import { Component, OnInit, Input } from '@angular/core';

import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'shop-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  @Input() userRole: string;
  interestData: any;
  statusLoading = false;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.statusLoading = true;
    this.backendService.getuserShoppingInterestData().subscribe((res: Array<any>) => {
      this.interestData = res;
      this.statusLoading = false;
    });
  }

}
