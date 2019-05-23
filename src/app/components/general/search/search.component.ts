import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { moveIn, fallIn } from 'src/app/shared/router.animation';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'shop-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'@moveIn': ''}
})
export class SearchComponent implements OnInit, OnDestroy {
  state = '';
  query: string;
  statusLoading: boolean;
  viewRole: string;
  querySubscription: any;
  cards = [];

  constructor(route: ActivatedRoute, private backendService: BackendService, private router: Router) {
    this.query = route.snapshot.params.query;
    this.query = this.query.split(':')[1].split('+').join(' ');
    this.backendService.logShoppingInterest('search', {key: this.query});
  }

  ngOnInit() {
    this.statusLoading = true;

    this.querySubscription = this.backendService.getUserStatus().subscribe((res: Array<any>) => {
      this.viewRole = res[1];
    });

    const data = {
      product: this.query
    };

    this.querySubscription = this.backendService.getProducts('product', data).subscribe((result: any) => {
      this.cards = result;
      this.statusLoading = false;
    });
  }

  toggleProduct = (id: number) => {
    this.router.navigate([`product/:${id}`]);
  }

  ngOnDestroy(): void {
    if (this.querySubscription) { this.querySubscription.unsubscribe(); }
  }

}
