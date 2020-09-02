import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StageModule } from '../stage/stage.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule.forRoot(),
    StageModule
  ],
  declarations: [DashboardDetailComponent]
})
export class DashboardModule { }
