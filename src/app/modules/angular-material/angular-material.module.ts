import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
// import { BrowserAnimationsModule,NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
        MatAutocompleteModule,
        MatBottomSheetModule,
        MatDividerModule,
        MatRippleModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatTreeModule,
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
import { DomSanitizer } from '@angular/platform-browser';
// import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        MatAutocompleteModule,
        MatBottomSheetModule,
        MatDividerModule,
        MatRippleModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatTreeModule,
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
        MatBadgeModule,
        A11yModule,
        DragDropModule,
        PortalModule,
        ScrollingModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule
        ],
    exports: [
      MatAutocompleteModule,
      MatBottomSheetModule,
      MatDividerModule,
      MatRippleModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatTreeModule,
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
      MatBadgeModule,
      A11yModule,
      DragDropModule,
      PortalModule,
      ScrollingModule,
      CdkStepperModule,
      CdkTableModule,
      CdkTreeModule
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
