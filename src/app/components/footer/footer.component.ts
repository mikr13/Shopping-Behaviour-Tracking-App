import { Component, OnInit } from '@angular/core';

import { BackendService } from './../../services/backend.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  configData: any;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.configData = this.backendService.getConfig();
  }

}
