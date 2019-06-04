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

  constructor(public afAuth: AngularFireAuth, private router: Router, private snackBar: MatSnackBar, private afs: AngularFirestore, private dialog: MatDialog) {
    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  googleLogin = async () => {
    const provider = new auth.GoogleAuthProvider();
    try {
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      this.snackBar.open('Successfully Signed In with Google.', 'CLOSE', {
        duration: 3500
      });
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
      this.updateUserData(credential.user);
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
      this.updateUserData(credential.user);
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
      this.openDialog('phone').subscribe(result => {
        data.phone = result;
        return Observable.create(observer => {
          observer.next(userRef.set(data, {merge: true}));
        });
      });
    } else if (data.email === '' && data.phone !== '') {
      this.openDialog('email').subscribe(result => {
        data.email = result;
        return Observable.create(observer => {
          observer.next(userRef.set(data, {merge: true}));
        });
      });
    } else if (data.email === '' && data.phone === '') {
      this.openDialog('both').subscribe(result => {
        data.phone = result[0];
        data.email = result[1];
        return Observable.create(observer => {
          observer.next(userRef.set(data, {merge: true}));
        });
      });
    } else {
      return Observable.create(observer => {
        observer.next(userRef.set(data, {merge: true}));
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
    }
    return error.message;
  }
}
