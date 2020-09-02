
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule, DateAdapter } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomDateAdapter } from './custom-date-adapter';
import { NgJsonEditorModule } from 'ang-jsoneditor' 

@NgModule({
   imports: [
     CommonModule,
     BrowserModule,
     BrowserAnimationsModule,
     NgSelectModule,
     MatBadgeModule,
     MatButtonModule,
     MatButtonToggleModule,
     MatSnackBarModule,
     MatDialogModule,
     MatSlideToggleModule,
     MatTabsModule,
     MatChipsModule,
     MatRippleModule,
     MatProgressBarModule,
     MatSidenavModule,
     MatMenuModule,
     MatMomentDateModule,
     MatDatepickerModule,
     NgJsonEditorModule,
     TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, '/assets/i18n/', '.json'),
          deps: [HttpClient]
      }
    })
   ],
   exports: [
     CommonModule,
     BrowserModule,
     BrowserAnimationsModule,
     NgSelectModule,
     MatBadgeModule,
     MatButtonModule,
     MatButtonToggleModule,
     MatSnackBarModule,
     MatDialogModule,
     MatSlideToggleModule,
     MatTabsModule,
     MatChipsModule,
     MatRippleModule,
     MatProgressBarModule,
     MatSidenavModule,
     MatMenuModule,
     MatMomentDateModule,
     MatDatepickerModule,
     NgJsonEditorModule,
     TranslateModule
   ],
   providers: [
     { provide: DateAdapter, useClass: CustomDateAdapter },
     { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
     {
       provide: MAT_DATE_FORMATS, useValue: {
         parse: { dateInput: 'DD/MM/YYYY' },
         display: { dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'LL', monthYearA11yLabel: 'MMMM-YYYY' }
       }
     }
   ]
})

export class SharedModule {
    constructor(private translateService: TranslateService) {
      translateService.setDefaultLang('en');
      translateService.use(document.documentElement.lang);
   }

   static forRoot(): ModuleWithProviders<SharedModule> {
    return {
        ngModule: SharedModule,
        providers: []
    };
}
}
