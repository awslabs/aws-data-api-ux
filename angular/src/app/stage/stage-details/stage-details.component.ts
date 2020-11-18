import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormHelperService } from '../../app-services/form-helper.service';
import { StageService } from '../../app-services/stage.service';
import { NamespaceService } from '../../app-services/namespace.service';

@Component({
  selector: 'app-stage-details',
  templateUrl: './stage-details.component.html',
  styleUrls: ['./stage-details.component.scss']
})
export class StageDetailsComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stageService: StageService,
    private namespaceService: NamespaceService,
    private formHelperService: FormHelperService) { }

  stage: any;
  entities: Array<any>;
  console = console;
  stageCode: string;

  ngOnInit() {
    this.stageCode = this.activatedRoute.snapshot.params['stage'];
    this.findStage(this.stageCode);
  }

  findStage(stageCode) {
    this.stageService.list()
    .subscribe(
      (res: any) => {
        this.stage = res.find(c => c.code === stageCode);
        this.searchEntities(this.stage.endpoint)
      },
      (err: any) => {
        this.formHelperService.showError('Errors.GenericError', null);
      }
    );
  }

  searchEntities(endpoint: string) {
    this.namespaceService.registry(endpoint)
    .subscribe(
      (res: any) => {
        this.entities = res;
      },
      (err: any) => {
        this.formHelperService.showError('Errors.GenericError', null);
      }
    );
  }
}

