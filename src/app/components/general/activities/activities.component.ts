import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shop-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  @Input() userRole: string;

  constructor() { }

  ngOnInit() {
  }

}
