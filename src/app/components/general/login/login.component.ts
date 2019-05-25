import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { AuthService } from './../../../services/auth.service';
import { WindowService } from './../../../services/window.service';
import { PhoneNumber } from 'src/app/shared/Phone';
import { environment } from 'src/environments/environment';
import { fallIn } from 'src/app/shared/router.animation';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'shop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '@fallIn': '' }
})
export class LoginComponent implements OnInit {
  state = '';
  windowRef: any;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;
  enablePhone: boolean;
  submitNumber: boolean;

  constructor(private win: WindowService, private snackBar: MatSnackBar, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.submitNumber = false;
    this.enablePhone = false;
    this.windowRef = this.win.windowRef;
    firebase.auth().useDeviceLanguage();
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'large',
      callback: (response: any) => {
        this.enablePhone = true;
      },
      'expired-callback': () => {
        alert('Please fill the recaptcha');
      }
    });
    this.windowRef.recaptchaVerifier.render();
  }

  sendLoginCode = () => {
    this.submitNumber = true;
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      })
      .catch(error => this.snackBar.open(error, 'CLOSE', {
        duration: 3500
      }));
  }

  verifyLoginCode = () => {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        result.user.phone = this.phoneNumber.e164;
        this.user = result.user;
        this.authService.updateUserData(result.user);
        this.snackBar.open('Successfully authenticated', 'CLOSE', {
          duration: 3500
        });
      })
      .catch(error => {
        this.snackBar.open(`Incorrect Code entered!${error}`, 'CLOSE', {
          duration: 3500
        });
      });
  }

}
