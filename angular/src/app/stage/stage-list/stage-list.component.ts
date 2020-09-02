import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormHelperService } from '../../app-services/form-helper.service';
import { StageService } from '../../app-services/stage.service';

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.scss']
})
export class StageListComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stageService: StageService,
    private formHelperService: FormHelperService) { }

  entities: Array<any>;
  console = console;

  ngOnInit() {
    this.searchEntities();
  }

  searchEntities() {
    this.stageService.list()
    .subscribe(
      (res: any) => {
        console.log('config', res);
        this.entities = res;        
      },
      (err: any) => {
        this.formHelperService.showError('Errors.GenericError', null);
      }
    );
  }
}

