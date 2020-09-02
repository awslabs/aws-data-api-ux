import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StageRoutingModule } from './stage-routing.module';
import { StageListComponent } from './stage-list/stage-list.component';
import { StageDetailsComponent } from './stage-details/stage-details.component';
import { NamespaceDetailsComponent } from './namespace-details/namespace-details.component';
import { NamespaceEditComponent } from './namespace-edit/namespace-edit.component';
import { ItemListComponent } from './item-list/item-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StageRoutingModule,
    SharedModule.forRoot()
  ],
  declarations: [
    StageListComponent,
    StageDetailsComponent,
    NamespaceDetailsComponent,
    NamespaceEditComponent,
    ItemListComponent
  ],
  exports: [
    StageListComponent
  ]
})
export class StageModule { }
