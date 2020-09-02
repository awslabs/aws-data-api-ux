import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityLoginComponent } from './security-login/security-login.component';

const routes: Routes = [
  { path: 'login',  component: SecurityLoginComponent, data: { layout: 'naked' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
