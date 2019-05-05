import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { Product } from '../shared/Product';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  member: Product[];

  constructor() {
    // Create 500 member
    this.member = Array.from({length: 500}, (_, k) => this.createNewmember(k + 1));
  }

  getConfig = () => {
    return environment.social;
  }

  getCartTotal = () => {
    const fake = '2';
    return Observable.create(observer => {
        setTimeout(() => {
          observer.next(fake);
        }, 2000);
      }
    );
  }

  getUserStatus = () => {
    const role = ['user', 'admin'];
    const fake = [true, role[Math.floor(Math.random() * role.length)]];
    return Observable.create(observer => {
        setTimeout(() => {
          observer.next(fake);
        }, 2000);
      }
    );
  }

  getProducts = (type: string, data?: any) => {
    if (type === 'products') {
      return Observable.create(observer => {
          setTimeout(() => {
            observer.next(this.member);
            observer.complete();
          }, 2000);
        }
      );
    } else if (type === 'product') {
      const result = this.member.filter(el => {
        if (el.category === data.category && el.product === data.product) {
          return el;
        }
      });
      return Observable.create(observer => {
          setTimeout(() => {
            observer.next(result);
            observer.complete();
          }, 2000);
        }
      );
    } else if (type === 'id') {
      const result = this.member.filter(el => {
        if (el.id === data) {
          return el;
        }
      });
      return Observable.create(observer => {
          setTimeout(() => {
            observer.next(result);
            observer.complete();
          }, 2000);
        }
      );
    }
  }

  saveNewProduct = (data: any) => {
    data.id = this.member.length + 1;
    this.member.push(data);
    return Observable.create(observer => {
        setTimeout(() => {
          observer.next(this.member);
          observer.complete();
        }, 5000);
      }
    );
  }

  updateProduct = (data: Product) => {
    if (this.member.includes(data)) {
      return Observable.create(observer => {
          setTimeout(() => {
            observer.next(this.member);
            observer.complete();
          }, 2000);
        }
      );
    } else {
      for (let i = 0; i < this.member.length; i++) {
        if (this.member[i].id === data.id) {
          this.member[i] = data;
          break;
        }
      }
      return Observable.create(observer => {
        setTimeout(() => {
          observer.next(this.member);
          observer.complete();
        }, 5000);
        }
      );
    }
  }

  deleteProduct = (id: Product['id']) => {
    this.member = this.member.filter(el => !(el.id === id));
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(this.member);
        observer.complete();
      }, 2000);
      }
    );
  }

  randomString = (length: number) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz ';
    let randomstring = '';

    for (let i = 0; i < length; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }

    return randomstring;
  }

  /** Builds and returns a new User. */
  createNewmember = (id: number) => {

    const category: Array<string> = ['Clothing', 'Watches', 'Tie', 'Issu', 'Suit', 'Basket'];
    const product: Array<string> = ['Tear raindrop tees', 'Rolex watches', 'Burger on', 'Vanilla js', 'Lumfafa'];
    const tags = ['disappear', 'smite', 'recite', 'scarp', 'learning', 'comment', 'scorch', 'leave', 'clover'];

    const getUnique = (count: number) => {
      // Make a copy of the array
      const tmp = tags.slice(0, tags.length);
      const ret = [];

      for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * tmp.length);
        const removed = tmp.splice(index, 1);
        // Since we are only removing one element
        ret.push(removed[0]);
      }
      return ret;
    };

    const data: Product = {
      id: id.toString(),
      category: category[Math.floor((Math.random() * category.length))],
      subcategory: 'T-Shirt',
      product: product[Math.floor((Math.random() * product.length))],
      tags: getUnique(Math.floor((Math.random() * tags.length) / 2 + 1)),
      description: this.randomString(Math.floor((Math.random() * 500) + 1)),
      price: Math.floor((Math.random() * 10000) + 1),
      maxdiscount: Math.floor((Math.random() * 40) + 1),
      extrataxes: Math.floor((Math.random() * 20) + 1)
    };

    return data;
  }
}
