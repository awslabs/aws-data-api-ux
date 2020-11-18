import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormHelperService } from '../../app-services/form-helper.service';
import { NamespaceService } from '../../app-services/namespace.service';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { StageService } from '../../app-services/stage.service';

@Component({
  selector: 'app-namespace-details',
  templateUrl: './namespace-details.component.html',
  styleUrls: ['./namespace-details.component.scss']
})
export class NamespaceDetailsComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private namespaceService: NamespaceService,
    private stageService: StageService,
    private formHelperService: FormHelperService) { }

  entityInfo: any;
  entityUsage: any;
  schemaResource: any;
  schemaResourceOptions: any;
  schemaMetadata: any;
  schemaMetadataOptions: any;
  console = console;
  stageCode: string;
  stageEndpoint: string;
  namespaceCode: string;

  ngOnInit() {
    this.namespaceCode = this.activatedRoute.snapshot.params['namespace'];
    let stageCode = this.activatedRoute.snapshot.params['stage'];
    this.stageService.list().subscribe(
      (res: any) => {
        let stage = res.find(c => c.code === stageCode);
        this.stageCode = stage.code;
        this.stageEndpoint = stage.endpoint;
        this.getEntityInfo();
        this.getEntityUsage();
    
        let options = new JsonEditorOptions();
        options.modes = ['code']
        options.mode = 'code';
        options.enableTransform = false;
        options.enableSort = false;
        options.search = false;
        options.mainMenuBar = false;
    
        this.schemaResourceOptions = options;
        this.schemaMetadataOptions = options;
    
        this.getSchemaResource();
        this.getSchemaMetadata();
      },
      (err: any) => {
        this.formHelperService.showError('Errors.GenericError', null);
      }
    );    
  }

  getEntityInfo() {
    this.namespaceService.info(this.stageEndpoint, this.namespaceCode)
    .subscribe(
      (res: any) => {
        this.entityInfo = res;
      },
      (err: any) => {
        this.formHelperService.showError('Errors.GenericError', null);
      }
    );
  }

  getEntityUsage() {
    this.namespaceService.usage(this.stageEndpoint, this.namespaceCode)
    .subscribe(
      (res: any) => {
        this.entityUsage = res;
      },
      (err: any) => {
        this.formHelperService.showError('Errors.GenericError', null);
      }
    );
  }

  getSchemaResource() {
    this.namespaceService.getSchemaResource(this.stageEndpoint, this.namespaceCode)
    .subscribe(
      (res: any) => {
        this.schemaResource = res;
      },
      (err: any) => {
        this.formHelperService.showError('Errors.GenericError', null);
      }
    );
  }

  getSchemaMetadata() {
    this.namespaceService.getSchemaMetadata(this.stageEndpoint, this.namespaceCode)
    .subscribe(
      (res: any) => {
        this.schemaMetadata = res;
      },
      (err: any) => {
        this.formHelperService.showError('Errors.GenericError', null);
      }
    );
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  setSchemaResource(schema: any) {
    this.namespaceService.setSchemaResource(this.stageEndpoint, this.namespaceCode, schema)
    .subscribe(
      (res: any) => {
        this.schemaResource = schema;
        this.formHelperService.showMessage('Messages.SchemaResourceSavedSuccessfully', null);
      },
      (err: any) => {
        this.formHelperService.showError('Errors.GenericError', null);
      }
    );   
  }

  setSchemaMetadata(schema: any) {
    this.namespaceService.setSchemaMetadata(this.stageEndpoint, this.namespaceCode, schema)
    .subscribe(
      (res: any) => {
        this.schemaMetadata = schema;
        this.formHelperService.showMessage('Messages.SchemaMetadataSavedSuccessfully', null);
      },
      (err: any) => {
        this.formHelperService.showError('Errors.GenericError', null);
      }
    );    
  }
}

