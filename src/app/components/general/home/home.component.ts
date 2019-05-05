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
  state = '';
  statusLoading: boolean;
  viewRole: string;

  cards = [];

  constructor() { }

  ngOnInit() {
    this.statusLoading = true;
    this.cards = [{
        name: 'Shiba Inu',
        type: 'Dog Breed',
        description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
        url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
      }, {
        name: 'Octo Rocto',
        type: 'Slimy Octopus',
        description: 'This tiny octopus looks as though it could be a character out of a Pixar movie. With large eyes, tiny flapping fins and a blob-like body, the octopus is too adorable.',
        url: 'https://cdn.pixabay.com/photo/2016/08/31/13/56/fish-1633525_640.jpg'
      }, {
        name: 'Pocupine',
        type: 'Desert Porcupine',
        description: ' Vivamus faucibus nisl nulla, in elementum arcu posuere ac. Nulla scelerisque nec diam imperdiet pretium. Sed posuere, augue quis pellentesque semper, erat dolor congue ex, sit amet vulputate ex tellus eget lectus.',
        url: 'https://cdn.pixabay.com/photo/2017/08/13/06/37/animal-2636367_640.jpg'
      }, {
        name: 'Chicki',
        type: 'Normal Chick',
        description: ' Vivamus faucibus nisl nulla, in elementum arcu posuere ac. Nulla scelerisque nec diam imperdiet pretium. Sed posuere, augue quis pellentesque semper, erat dolor congue ex, sit amet vulputate ex tellus eget lectus.',
        url: 'https://cdn.pixabay.com/photo/2014/05/20/21/20/easter-349026_640.jpg'
      }];
  }

  receiveStatus = ($event) => {
    this.viewRole = $event;
    this.statusLoading = false;
  }

}
