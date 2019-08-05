import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { DialogComponent } from './../components/general/dialog/dialog.component';

interface User {
  uid: string;
  phone: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  socialUser: string;
  status: boolean;

  constructor(public afAuth: AngularFireAuth, private router: Router, private snackBar: MatSnackBar, private afs: AngularFirestore, private dialog: MatDialog) {
    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  getUserStatus = () => {
    const role = ['user', 'admin'];
    const status = 'false';
    if (!localStorage.getItem('userLoginStatus') || !localStorage.getItem('userRole')) {
      localStorage.setItem('userLoginStatus', status);
      localStorage.setItem('userRole', role[0]);
      return Observable.create(observer => {
        setTimeout(() => {
          observer.next([localStorage.getItem('userLoginStatus'), localStorage.getItem('userRole')]);
        }, 2000);
      });
    } else if (!status.includes(localStorage.getItem('userLoginStatus')) || !role.includes(localStorage.getItem('userRole'))) {
      return Observable.create(observer => {
        this.removeUserAuth(() => {
          localStorage.setItem('userLoginStatus', status);
          localStorage.setItem('userRole', role[0]);
          setTimeout(() => {
            observer.next([localStorage.getItem('userLoginStatus'), localStorage.getItem('userRole')]);
          }, 2000);
        });
      });
    } else {
      if (localStorage.getItem('userRole') === role[1]) {
        if (localStorage.getItem('userLoginStatus') === status || !localStorage.getItem('userLoginStatus')) {
          return Observable.create(observer => {
            this.removeUserAuth(() => {
              localStorage.setItem('userLoginStatus', status);
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
            this.removeUserAuth(() => {
              localStorage.setItem('userLoginStatus', status);
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
        } else if (localStorage.getItem('userLoginStatus') === status) {
          return Observable.create(observer => {
            observer.next([localStorage.getItem('userLoginStatus'), localStorage.getItem('userRole')]);
          });
        } else {
          return Observable.create(observer => {
            this.removeUserAuth(() => {
              localStorage.setItem('userLoginStatus', status);
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

  isUserLoggedIn = () => {
    return this.afAuth.authState;
  }

  private removeUserAuth = (callback: () => void) => {
    this.signOut();
    callback();
  }

  googleLogin = async () => {
    const provider = new auth.GoogleAuthProvider();
    try {
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      this.snackBar.open('Successfully Signed In with Google.', 'CLOSE', {
        duration: 3500
      });
      this.status = true;
      this.updateUserData(credential.user).subscribe(data => {
        console.log(data);
      });
    } catch (error) {
      return this.handleError(error);
    }
  }

  facebookLogin = async () => {
    const provider = new auth.FacebookAuthProvider();
    try {
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      this.snackBar.open('Successfully Signed In with Facebook.', 'CLOSE', {
        duration: 3500
      });
      this.status = true;
      this.updateUserData(credential.user).subscribe(data => {
        console.log(data);
      })
    } catch (error) {
      return this.handleError(error);
    }
  }

  twitterLogin = async () => {
    const provider = new auth.TwitterAuthProvider();
    try {
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      this.snackBar.open('Successfully Signed In with Twitter.', 'CLOSE', {
        duration: 3500
      });
      this.status = true;
      this.updateUserData(credential.user).subscribe(data => {
        console.log(data);
      })
    } catch (error) {
      return this.handleError(error);
    }
  }

  public updateUserData = (user: any) => {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      phone: user.phone || '',
      email: user.email || '',
      name: user.displayName,
    };

    if (data.phone === '' && data.email !== '') {
      return Observable.create(observer => {
        this.openDialog('phone').subscribe(result => {
          data.phone = result;
          userRef.set(data, { merge: true });
          observer.next(data);
          observer.complete();
        });
      });
    } else if (data.email === '' && data.phone !== '') {
      return Observable.create(observer => {
        this.openDialog('email').subscribe(result => {
          data.email = result;
          userRef.set(data, { merge: true });
          observer.next(data);
          observer.complete();
        });
      });
    } else if (data.email === '' && data.phone === '') {
      return Observable.create(observer => {
        this.openDialog('both').subscribe(result => {
          data.phone = result[0];
          data.email = result[1];
          userRef.set(data, { merge: true });
          observer.next(data);
          observer.complete();
        });
      });
    } else {
      return Observable.create(observer => {
        observer.next(userRef.set(data, { merge: true }));
        observer.complete();
      });
    }
  }

  private openDialog = (type?: string) => {
    if (type === 'phone') {
      const dialogRef = this.dialog.open(DialogComponent, {
        disableClose: true,
        data: 'phone'
      });

      return Observable.create(observer => {
        dialogRef.afterClosed().subscribe(result => {
          observer.next(result);
        });
      });
    } else if (type === 'email') {
      const dialogRef = this.dialog.open(DialogComponent, {
        disableClose: true,
        data: 'email'
      });

      return Observable.create(observer => {
        dialogRef.afterClosed().subscribe(result => {
          observer.next(result);
        });
      });
    } else {
      const dialogRef = this.dialog.open(DialogComponent, {
        disableClose: true,
        data: 'both'
      });

      return Observable.create(observer => {
        dialogRef.afterClosed().subscribe(result => {
          observer.next(result);
        });
      });
    }
  }

  signOut = async () => {
    await this.afAuth.auth.signOut();
    this.status = false;
    localStorage.clear();
    this.router.navigate(['/']);
    this.snackBar.open('You have been Logged Out.', 'CLOSE', {
      duration: 3500
    });
  }

  // If error, console log and notify user
  private handleError = (error: any) => {
    if (error.code === 'auth/popup-blocked') {
      this.snackBar.open(
        'Your browser has disabled Popups. Please Try again',
        'CLOSE'
      );
    } else if (error.code === 'auth/popup-closed-by-user') {
      this.snackBar.open('Please reload and try again.', 'CLOSE', {
        duration: 3000
      });
    } else {
      this.snackBar.open(error.message, 'CLOSE', { duration: 3500 });
      console.log(error);
    }
    return error.message;
  }
}
