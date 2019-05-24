import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { Product } from '../shared/Product';
import { Orders } from '../shared/Orders';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  products: any[];
  orders: any[];
  cart: Array<any> = [];
  userInterest = {
    search: [],
    productClick: [],
    addCart: [],
    removeCart: []
  };

  constructor() {
    // Create 200 products
    this.products = Array.from({ length: 200 }, (_, k) => this.createNewmember('products', k + 1));
    // Create 50 orders
    this.orders = Array.from({ length: 200 }, (_, k) => this.createNewmember('orders', k + 1));
  }

  getConfig = () => {
    return environment.social;
  }

  getUserStatus = () => {
    const role = ['user', 'admin'];
    const status = ['false', 'true'];
    if (!localStorage.getItem('userLoginStatus') || !localStorage.getItem('userRole')) {
      localStorage.setItem('userLoginStatus', status[0]);
      localStorage.setItem('userRole', role[0]);
      return Observable.create(observer => {
        setTimeout(() => {
          observer.next([localStorage.getItem('userLoginStatus'), localStorage.getItem('userRole')]);
        }, 2000);
      });
    } else if (!status.includes(localStorage.getItem('userLoginStatus')) || !role.includes(localStorage.getItem('userRole'))) {
      return Observable.create(observer => {
        this.removeUserAuth(0, () => {
          localStorage.setItem('userLoginStatus', status[0]);
          localStorage.setItem('userRole', role[0]);
          setTimeout(() => {
            observer.next([localStorage.getItem('userLoginStatus'), localStorage.getItem('userRole')]);
          }, 2000);
        });
      });
    } else {
      if (localStorage.getItem('userRole') === role[1]) {
        if (localStorage.getItem('userLoginStatus') === status[0] || !localStorage.getItem('userLoginStatus')) {
          return Observable.create(observer => {
            this.removeUserAuth(0, () => {
              localStorage.setItem('userLoginStatus', status[0]);
              localStorage.setItem('userRole', role[0]);
              setTimeout(() => {
                observer.next([localStorage.getItem('userLoginStatus'), localStorage.getItem('userRole')]);
              }, 2000);
            });
          });
        } else if (localStorage.getItem('userLoginStatus') === status[1]) {
          return Observable.create(observer => {
            observer.next([localStorage.getItem('userLoginStatus'), localStorage.getItem('userRole')]);
          });
        } else {
          return Observable.create(observer => {
            this.removeUserAuth(0, () => {
              localStorage.setItem('userLoginStatus', status[0]);
              localStorage.setItem('userRole', role[0]);
              setTimeout(() => {
                observer.next([localStorage.getItem('userLoginStatus'), localStorage.getItem('userRole')]);
              }, 2000);
            });
          });
        }
      } else if (localStorage.getItem('userRole') === 'user') {
        if (localStorage.getItem('userLoginStatus') === status[1]) {
          return Observable.create(observer => {
            observer.next([localStorage.getItem('userLoginStatus'), localStorage.getItem('userRole')]);
          });
        } else if (localStorage.getItem('userLoginStatus') === status[0]) {
          return Observable.create(observer => {
            observer.next([localStorage.getItem('userLoginStatus'), localStorage.getItem('userRole')]);
          });
        } else {
          return Observable.create(observer => {
            this.removeUserAuth(0, () => {
              localStorage.setItem('userLoginStatus', status[0]);
              localStorage.setItem('userRole', role[0]);
              setTimeout(() => {
                observer.next([localStorage.getItem('userLoginStatus'), localStorage.getItem('userRole')]);
              }, 2000);
            });
          });
        }
      }
    }
  }

  private removeUserAuth = (duration: number, callback) => {
    setTimeout(() => {
      localStorage.removeItem('userLoginStatus');
      localStorage.removeItem('userRole');
      callback();
    }, duration);
  }

  getProducts = (type: string, data?: any) => {
    if (type === 'products') {
      return Observable.create(observer => {
        setTimeout(() => {
          observer.next(this.products);
          observer.complete();
        }, 2000);
      }
      );
    } else if (type === 'product') {
      const result = this.products.filter(el => {
        if (data.category) {
          if (el.category === data.category && el.product === data.product) {
            return el;
          }
        } else {
          if (el.product === data.product) {
            return el;
          }
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
      const result = this.products.filter(el => {
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
    data.id = this.products.length + 1;
    this.products.push(data);
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(this.products);
        observer.complete();
      }, 5000);
    }
    );
  }

  updateProduct = (data: Product) => {
    if (this.products.includes(data)) {
      return Observable.create(observer => {
        setTimeout(() => {
          observer.next(this.products);
          observer.complete();
        }, 2000);
      }
      );
    } else {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === data.id) {
          this.products[i] = data;
          break;
        }
      }
      return Observable.create(observer => {
        setTimeout(() => {
          observer.next(this.products);
          observer.complete();
        }, 5000);
      }
      );
    }
  }

  deleteProduct = (id: Product['id']) => {
    this.products = this.products.filter(el => !(el.id === id));
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(this.products);
        observer.complete();
      }, 2000);
    }
    );
  }

  private randomString = (length: number) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz ';
    let randomstring = '';

    for (let i = 0; i < length; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }

    return randomstring;
  }

  /** Builds and returns a new User. */
  private createNewmember = (type: string, id: number) => {
    if (type === 'products') {
      const category: Array<string> = ['Clothing', 'Watches', 'Tie', 'Issu', 'Suit', 'Basket'];
      const product: Array<string> = ['Tear raindrop tees', 'Rolex watches', 'Burger on', 'Vanilla js', 'Lumfafa'];
      const tags: Array<string> = ['disappear', 'smite', 'recite', 'scarp', 'learning', 'comment', 'scorch', 'leave', 'clover'];
      const images: Array<string> = ['https://material.angular.io/assets/img/examples/shiba2.jpg', 'https://cdn.pixabay.com/photo/2016/08/31/13/56/fish-1633525_640.jpg', 'https://cdn.pixabay.com/photo/2017/08/13/06/37/animal-2636367_640.jpg', 'https://cdn.pixabay.com/photo/2014/05/20/21/20/easter-349026_640.jpg'];

      const getUnique = (data: any, count: number) => {
        // Make a copy of the array
        const tmp = data.slice(0, data.length);
        const ret = [];

        for (let i = 0; i < count; i++) {
          const index = Math.floor(Math.random() * tmp.length);
          const removed = tmp.splice(index, 1);
          // Since we are only removing one element
          ret.push(removed[0]);
        }
        return ret;
      };

      const data = {
        id: id.toString(),
        category: category[Math.floor((Math.random() * category.length))],
        subcategory: 'T-Shirt',
        product: product[Math.floor((Math.random() * product.length))],
        tags: getUnique(tags, Math.floor((Math.random() * tags.length) / 2 + 1)),
        description: this.randomString(Math.floor((Math.random() * 500) + 1)),
        price: Math.floor((Math.random() * 10000) + 1),
        maxdiscount: Math.floor((Math.random() * 40) + 1),
        extrataxes: Math.floor((Math.random() * 20) + 1),
        images: getUnique(images, Math.floor(Math.random() * 3) + 1)
      };

      return data;
    } else {
      const phone: Array<string> = ['9062987052', '9113407684', '8697935383', '8797185175', '7209783038'];
      const productMatch = Math.floor((Math.random() * this.products.length)); // to map with product in products array
      const cartCount = Math.floor((Math.random() * 3) + 1);

      const data: Orders = {
        orderID: id.toString(),
        userID: this.randomString(Math.floor((Math.random() * 10) + 3)),
        phone: phone[Math.floor((Math.random() * phone.length))],
        product: this.products[productMatch].product,
        productID: this.products[productMatch].id,
        productCount: cartCount,
        cost: cartCount * this.products[productMatch].price,
        expectedDelivery: Date.now() + Math.floor(Math.random() * 10000000000),
        execContact: phone[Math.floor((Math.random() * phone.length))]
      };

      return data;
    }
  }

  logShoppingInterest = (type: string, data: any) => {
    if (!localStorage.getItem('userLoginStatus') || !localStorage.getItem('userRole') || localStorage.getItem('userRole') === 'admin' || localStorage.getItem('userLoginStatus') === 'false') {
      return;
    } else {
      data.time = Date.now();
      this.userInterest[type].push(data);
    }
  }

  getuserShoppingInterestData = () => {
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(this.userInterest);
      }, 2000);
    });
  }

  getCartTotal = () => {
    let count = 0;

    for (const i of this.cart) {
      count = count + parseInt(i.count, 10);
    }

    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(count);
      }, 2000);
    });
  }

  getCart = () => {
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(this.cart);
      }, 2000);
    });
  }

  addRemoveCart = (type: string, id: string, count?: number) => {
    let result: number;

    for (const el of this.cart) {
      if (el.item.id === id) {
        result = this.cart.indexOf(el);
        break;
      }
    }

    const data = this.products.filter(el => {
      if (el.id === id) {
        return el;
      }
    });

    if (type === 'add') {
      if (result >= -1) {
        this.cart[result].count = parseInt(this.cart[result].count, 10) + count;
      } else {
        this.cart.push({ item: data[0], count });
      }
    } else if (type === 'sub') {
      if (result >= -1) {
        this.cart[result].count = parseInt(this.cart[result].count, 10) - count;
        if (this.cart[result].count < 1) {
          this.cart.splice(result, 1);
        }
      } else {
        return;
      }
    } else {
      this.cart.splice(result, 1);
    }
  }

  getOrders = (type: string, data?: any) => {
    if (type === 'orders') {
      return Observable.create(observer => {
        setTimeout(() => {
          observer.next(this.orders);
          observer.complete();
        }, 2000);
      }
      );
    } else if (type === 'order') {
      const result = this.orders.filter(el => {
          if (el.userID === data.userID && el.phone === data.phone) {
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
      const result = this.orders.filter(el => {
        if (el.orderID === data) {
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
}
