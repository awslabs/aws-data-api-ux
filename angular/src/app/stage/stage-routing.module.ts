import { NgModule } from '@angular/core';
import { SecurityGuard } from '../app-guards/security.guard';
import { Routes, RouterModule } from '@angular/router';
import { StageListComponent } from './stage-list/stage-list.component';
import { StageDetailsComponent } from './stage-details/stage-details.component';
import { NamespaceEditComponent } from './namespace-edit/namespace-edit.component';
import { NamespaceDetailsComponent } from './namespace-details/namespace-details.component';
import { ItemListComponent } from './item-list/item-list.component';

const routes: Routes = [
  { path: 'stages',  component: StageListComponent, canActivate: [SecurityGuard] },
  { path: 'stages/:stage', component: StageDetailsComponent, canActivate: [SecurityGuard] },
  { path: 'stages/:stage/new', component: NamespaceEditComponent, canActivate: [SecurityGuard] },
  { path: 'stages/:stage/:namespace', component: NamespaceDetailsComponent, canActivate: [SecurityGuard] },
  { path: 'stages/:stage/:namespace/resources', component: ItemListComponent, canActivate: [SecurityGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StageRoutingModule { }
