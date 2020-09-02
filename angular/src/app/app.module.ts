import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SecurityInterceptor } from './app-interceptors/security.interceptor';
import { AppComponent } from './app.component';
import { SecurityGuard } from './app-guards/security.guard';
import { SecurityService } from './app-services/security.service';
import { SecurityModule } from './security/security.module';
import { SharedModule } from './shared/shared.module';
import { FormHelperService } from './app-services/form-helper.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { StageService } from './app-services/stage.service';
import { StageModule } from './stage/stage.module';
import { ResourceService } from './app-services/resource.service';
import { NamespaceService } from './app-services/namespace.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SecurityModule,
    StageModule,
    DashboardModule,
    BrowserModule,
    SharedModule.forRoot()
  ],
  providers: [
    SecurityGuard,
    StageService,
    SecurityService,
    FormHelperService,
    ResourceService,
    NamespaceService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: SecurityInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
