import { NgModule } from '@angular/core';
import { SecurityGuard } from '../app-guards/security.guard';
import { Routes, RouterModule } from '@angular/router';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [SecurityGuard] },
  { path: 'dashboard',  component: DashboardDetailComponent, canActivate: [SecurityGuard] },
  { path: '**', redirectTo: 'dashboard', canActivate: [SecurityGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
