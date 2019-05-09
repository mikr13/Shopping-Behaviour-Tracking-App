import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { moveIn, fallIn } from 'src/app/shared/router.animation';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'shop-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'@moveIn': ''}
})
export class ProductsComponent implements OnInit, OnDestroy {
  state = '';
  query: string;
  statusLoading: boolean;
  viewRole: string;
  querySubscription: any;

  cards = [];

  constructor(route: ActivatedRoute, private backendService: BackendService) {
    this.query = route.snapshot.params.query;
    this.query = this.query.split(':')[1].split('+').join(' ');
  }

  ngOnInit() {
    this.statusLoading = true;

    this.querySubscription = this.backendService.getUserStatus().subscribe((res: Array<any>) => {
      this.viewRole = res[1];
      this.statusLoading = false;
    });

    this.cards = [{
      name: this.query,
      type: 'Dog Breed',
      description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    }];
  }

  ngOnDestroy(): void {
    if (this.querySubscription) { this.querySubscription.unsubscribe(); }
  }

}
