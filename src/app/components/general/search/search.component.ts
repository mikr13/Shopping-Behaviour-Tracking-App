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
  }

  ngOnInit() {
    this.statusLoading = true;

    this.querySubscription = this.backendService.getUserStatus().subscribe((res: Array<any>) => {
      this.viewRole = res[1];
      this.statusLoading = false;
    });

    this.cards = [{
      id: '989380_dusgu_21',
      name: this.query,
      type: 'Dog Breed',
      description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    }, {
      id: '342525_jngtn_22',
      name: 'Octo Rocto',
      type: 'Slimy Octopus',
      description: 'This tiny octopus looks as though it could be a character out of a Pixar movie. With large eyes, tiny flapping fins and a blob-like body, the octopus is too adorable.',
      url: 'https://cdn.pixabay.com/photo/2016/08/31/13/56/fish-1633525_640.jpg'
    }];
  }

  toggleProduct = (id: number) => {
    // this.router.navigate([`product/:${id}`]);
    this.router.navigate([`product/:989380_dusgu_21`]);
  }

  ngOnDestroy(): void {
    if (this.querySubscription) { this.querySubscription.unsubscribe(); }
  }

}
