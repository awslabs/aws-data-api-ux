import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormHelperService } from '../../app-services/form-helper.service';
import { ResourceService } from '../../app-services/resource.service';
import { StageService } from 'app/app-services/stage.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private resourceService: ResourceService,
    private activatedRoute: ActivatedRoute,
    private stageService: StageService,
    private formHelperService: FormHelperService) { }

  formGroup: FormGroup;
  entities: Array<any>;
  entityHeaders: Array<any>;
  search: any;
  console = console;

  stageCode: string;
  stageEndpoint: string;
  namespaceCode: string;

  ngOnInit() {
    let stageCode = this.activatedRoute.snapshot.params['stage'];
    this.namespaceCode = this.activatedRoute.snapshot.params['namespace'];

    this.stageService.list()
    .subscribe(
      (res: any) => {
        let stage = res.find(c => c.code === stageCode);
        this.stageCode = stage.code;
        this.stageEndpoint = stage.endpoint;

        this.search = {
          page: 1,
          pageSize: 10,
          queryMetadata: '',
          queryResource: '',
          lastTokenStack: ['0']
        };
    
        this.formGroup = this.fb.group({
          queryMetadata: new FormControl(this.search.queryMetadata),
          queryResource: new FormControl(this.search.queryResource)
        });
    
        this.searchEntities();
      },
      (err: any) => {
        this.formHelperService.showError('Errors.GenericError', null);
      }
    ); 
  }
  
  goPrev() {
    if (this.search.page > 1) {
      if (this.search.lastTokenStack.length > 2) {
        this.search.lastTokenStack.pop();
        this.search.lastTokenStack.pop();
      } else if (this.search.lastTokenStack.length > 1) {
        this.search.lastTokenStack.pop();
      }
      this.searchEntities();
      this.search.page--;
    }
  }

  goNext() {
    if (this.search.page < this.search.lastTokenStack.length) {
      this.searchEntities();
      this.search.page++;
    }
  }

  // goPage(page) {
  //   if (page >= 0 && page <= (this.search.pageCount - 1)) {
  //     this.search.page = page;
  //     this.searchEntities();
  //   }
  // }

  searchFormSubmit(event) {
    this.search.queryResource = this.formGroup.get('queryResource').value;
    this.search.queryMetadata = this.formGroup.get('queryMetadata').value;
    this.search.page = 1;
    this.search.lastTokenStack = ['0'];
    this.searchEntities();
  }

  searchEntities() {
    let lastToken = this.search.lastTokenStack[this.search.lastTokenStack.length - 1];


    if (this.search.queryResource || this.search.queryMetadata) {
      let query : any = {};

      if(this.search.queryResource) {
        query.Resource = JSON.parse(this.search.queryResource);
      }

      if(this.search.queryMetadata) {
        query.Metadata = JSON.parse(this.search.queryMetadata);
      }

      this.resourceService.find(this.stageEndpoint, this.namespaceCode, lastToken, this.search.pageSize, query)
      .subscribe(
        (res: any) => {
          this.search.pageCount = res.pageCount;
          if(res.LastEvaluatedKey) {
            this.search.lastTokenStack.push(res.LastEvaluatedKey);
          }
          this.entities = res.Items;
          this.processItems(this.entities);
          console.log(res);
        },
        (err: any) => {
          console.log(err);
          this.formHelperService.showError('Errors.GenericError', null);
        }
      );
    } else {
      this.resourceService.list(this.stageEndpoint, this.namespaceCode, lastToken, this.search.pageSize)
      .subscribe(
        (res: any) => {
          this.search.pageCount = res.pageCount;
          if(res.LastEvaluatedKey) {
            this.search.lastTokenStack.push(res.LastEvaluatedKey.id);
          }
          this.entities = res.Items;
          this.processItems(this.entities);
          console.log(res);
        },
        (err: any) => {
          console.log(err);
          this.formHelperService.showError('Errors.GenericError', null);
        }
      );
    }
  }

  processItems(items: any[]) {
    this.entityHeaders = [];
    items.forEach((entity) => {
      Object.getOwnPropertyNames(entity).forEach((propertyName) => {
        if (this.entityHeaders.findIndex((p) => p === propertyName) === -1) {
          this.entityHeaders.push(propertyName);
        }
      })
    });
    console.log('properties', this.entityHeaders);
  }
}
