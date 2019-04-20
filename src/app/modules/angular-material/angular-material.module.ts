import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { BrowserAnimationsModule,NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatDialogModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        MatCardModule,
        MatChipsModule,
        MatListModule,
        MatTooltipModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSortModule,
        MatSnackBarModule,
        MatStepperModule,
        MatGridListModule,
        MatExpansionModule,
        MatRadioModule,
        MatBadgeModule,
        MatIconRegistry
        } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
// import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatDialogModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        MatCardModule,
        MatChipsModule,
        MatListModule,
        MatTooltipModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSortModule,
        MatSnackBarModule,
        MatStepperModule,
        MatGridListModule,
        MatBadgeModule,
        MatExpansionModule,
        MatRadioModule,
        MatBadgeModule
        ],
    exports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        MatCardModule,
        MatChipsModule,
        MatListModule,
        MatTooltipModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSortModule,
        MatSnackBarModule,
        MatStepperModule,
        MatGridListModule,
        MatBadgeModule,
        MatExpansionModule,
        MatRadioModule,
        MatBadgeModule
        ],
    declarations: []
})

export class AngularMaterialModule {
    constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {

      this.iconRegistry.addSvgIcon(
        'github', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg')
      );

      this.iconRegistry.addSvgIcon(
        'email', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/email.svg')
      );
    }
}
