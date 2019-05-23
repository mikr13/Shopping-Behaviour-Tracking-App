import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { moveIn, fallIn } from 'src/app/shared/router.animation';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'shop-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '@moveIn': '', '@fallIn': '' }
})
export class HomeComponent implements OnInit, OnDestroy {
  state = '';
  statusLoading: boolean;
  viewRole: string;
  querySubscription: any;
  search: string;
  cards = [];
  lazyload = [];
  currentIndex = 15;
  cardLoading = false;
  showScroll = false;
  showScrollHeight = 300;
  hideScrollHeight = 10;

  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit() {
    this.statusLoading = true;

    this.querySubscription = this.backendService.getUserStatus().subscribe((res: Array<any>) => {
      this.viewRole = res[1];
    });

    this.querySubscription = this.backendService.getProducts('products').subscribe((data: any) => {
      this.cards = data;
      this.lazyload = this.cards.slice(0, this.currentIndex);
      this.statusLoading = false;
    });
  }

  toggleProduct = (id: number) => {
    this.router.navigate([`product/:${id}`]);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const win = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const pos = win + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;

    if (win > this.showScrollHeight) {
      this.showScroll = true;
    } else if (this.showScroll && win < this.hideScrollHeight) {
      this.showScroll = false;
    }

    if (pos >= max) {
      this.cardLoading = true;
      setTimeout(() => {
        this.cardLoading = false;
        this.currentIndex = this.currentIndex + 15;
        if (this.currentIndex < this.cards.length) {
          this.lazyload = this.cards.slice(0, this.currentIndex);
        } else {
          this.currentIndex = this.cards.length;
          this.lazyload = this.cards.slice(0, this.currentIndex);
        }
      }, 3000);
    }
  }

  private smoothscroll = () => {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(this.smoothscroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  }

  ngOnDestroy(): void {
    if (this.querySubscription) { this.querySubscription.unsubscribe(); }
  }
}

