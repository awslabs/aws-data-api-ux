import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormHelperService } from '../../app-services/form-helper.service';
import { NamespaceService } from '../../app-services/namespace.service';
import { interval, of } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import moment from 'moment';
import { StageService } from '../../app-services/stage.service';


@Component({
  selector: 'app-namespace-edit',
  templateUrl: './namespace-edit.component.html',
  styleUrls: ['./namespace-edit.component.scss']
})
export class NamespaceEditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private namespaceService: NamespaceService,
    private stageService: StageService,
    private formHelperService: FormHelperService) { }

  entityForm: FormGroup;
  entity: any;
  stageCode: string;
  stageEndpoint: string;
  namespaceCode: string;
  waitingSince: any;
  waitingTranslate: any;
  waiting: boolean;

  ngOnInit() {
    let stageCode = this.activatedRoute.snapshot.params['stage'];
    this.entity = {};
    this.stageService.list()
    .subscribe(
      (res: any) => {
        let stage = res.find(c => c.code === stageCode);
        this.stageCode = stage.code;
        this.stageEndpoint = stage.endpoint;
        this.formOnInit();
      },
      (err: any) => {
        this.formHelperService.showError('Errors.GenericError', null);
      }
    );    
  }

  formOnInit() {
    this.entityForm = this.fb.group({
      Namespace: new FormControl(null, [
        Validators.required,
        Validators.pattern('\\w{2,64}')
      ]),
      PrimaryKey: new FormControl(null, [
        Validators.required,
        Validators.pattern('\\w{2,64}')
      ])
    });
  }

  formOnSubmit(event: Event): void {
    event.preventDefault();
    this.formHelperService.validateAllFormFields(this.entityForm);

    if (this.entityForm.valid) {
      this.namespaceCode = this.entityForm.value.Namespace;
      this.namespaceService.provision(this.stageEndpoint, this.namespaceCode, this.entityForm.value)
      .subscribe(
        (res: any) => {
          this.formHelperService.showMessage('Messages.NamespaceProvisioningStartedSuccessfully', null);
          this.pullStatus();
        },
        (err: any) => {
          console.log(err);
          this.formHelperService.showError('Errors.GenericError', null);
        }
      );
    }
  }

  pullStatus() {
    this.waitingSince = moment();
    this.waitingTranslate = { when: this.waitingSince.fromNow() };
    this.waiting = true;
    const inter = interval(10000)
      .pipe(
        switchMap((i) => { return of(i); }),
        takeWhile(() => this.waiting)
      );
    
    inter.subscribe((val) => {
      this.namespaceService.info(this.stageEndpoint, this.namespaceCode)
      .subscribe(
        (res: any) => {
          if (res.Status && res.Status === 'ACTIVE') {
            this.waiting = false;
            this.formHelperService.showMessage('Messages.NamespaceProvisionedSuccessfully', null);
            this.router.navigate(['/stages', this.stageCode, this.namespaceCode]);
          } else {
            this.waitingTranslate = { when: this.waitingSince.fromNow() };
          }
        },
        (err: any) => {
          this.formHelperService.showError('Errors.GenericError', null);
        }
      );
    });
  }
}
