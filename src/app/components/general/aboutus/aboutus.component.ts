import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { moveIn, fallIn } from 'src/app/shared/router.animation';
import { BackendService } from 'src/app/services/backend.service';

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
  state = '';
  querySubscription: any;
  viewRole: any;

  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit() {

    this.querySubscription = this.backendService.getUserStatus().subscribe((res: Array<any>) => {
      this.viewRole = res[1];
    });

    if (this.viewRole !== 'user') {
      this.router.navigate(['']);
    }
  }

}
