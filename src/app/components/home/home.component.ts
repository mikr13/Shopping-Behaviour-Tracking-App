import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from 'src/app/shared/router.animation';

@Component({
  selector: 'shop-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'@moveIn': ''}
})
export class HomeComponent implements OnInit {
  state: string = '';

  constructor() { }

  ngOnInit() {
  }

}
