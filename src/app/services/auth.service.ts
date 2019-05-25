import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

interface User {
  uid: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  socialUser: string;

  constructor(public afAuth: AngularFireAuth, private router: Router, private snackBar: MatSnackBar, private afs: AngularFirestore) {
    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        this.updateUserData(user);
        return of(user);
      } else {
        return of(null);
      }
    }));
  }

  googleLogin = () => {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then(user => {
        this.snackBar.open('Successfully Signed In with Google.', 'CLOSE', {
          duration: 3500
        });
        this.updateUserData(user);
      })
      .catch(error => this.handleError(error));
  }

  facebookLogin = () => {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider)
      .then(user => {
        this.snackBar.open('Successfully Signed In with Facebook.', 'CLOSE', {
          duration: 3500
        });
        this.updateUserData(user);
      })
      .catch(error => this.handleError(error));
  }

  public oAuthLogin = (provider) => {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  public updateUserData = (user: User) => {
    const data: User = {
      uid: user.uid,
      phone: user.phone
    };
    // this.socialUser = JSON.stringify(user);
    console.log(data);
    return user;
  }

  signOut = () => {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.clear();
      this.router.navigate(['/']);
      this.snackBar.open('You have been Logged Out.', 'CLOSE', {
        duration: 3500
      });
    });
  }

  // If error, console log and notify user
  private handleError = (error) => {
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
