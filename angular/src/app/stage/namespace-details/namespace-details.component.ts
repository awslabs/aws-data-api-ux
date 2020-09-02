import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormHelperService } from '../../app-services/form-helper.service';
import { NamespaceService } from '../../app-services/namespace.service';
import { JsonEditorOptions } from 'ang-jsoneditor';

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
    private formHelperService: FormHelperService) { }

  entityInfo: any;
  entityUsage: any;
  schemaResource: any;
  schemaResourceOptions: any;
  schemaMetadata: any;
  schemaMetadataOptions: any;
  console = console;
  stageCode: string;
  namespaceCode: string;

  ngOnInit() {
    this.stageCode = this.activatedRoute.snapshot.params['stage'];
    this.namespaceCode = this.activatedRoute.snapshot.params['namespace'];
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

    console.log('options', this.schemaResourceOptions);

    this.getSchemaResource();
    this.getSchemaMetadata();
  }

  getEntityInfo() {
    this.namespaceService.info(this.stageCode, this.namespaceCode)
    .subscribe(
      (res: any) => {
        this.entityInfo = res;
        console.log(this.entityInfo);
      },
      (err: any) => {
        this.formHelperService.showError('Errors.GenericError', null);
      }
    );
  }

  getEntityUsage() {
    this.namespaceService.usage(this.stageCode, this.namespaceCode)
    .subscribe(
      (res: any) => {
        this.entityUsage = res;
        console.log(this.entityUsage);
      },
      (err: any) => {
        this.formHelperService.showError('Errors.GenericError', null);
      }
    );
  }

  getSchemaResource() {
    this.namespaceService.getSchemaResource(this.stageCode, this.namespaceCode)
    .subscribe(
      (res: any) => {
        this.schemaResource = res;
        console.log(this.schemaResource);
      },
      (err: any) => {
        this.formHelperService.showError('Errors.GenericError', null);
      }
    );
  }

  getSchemaMetadata() {
    this.namespaceService.getSchemaMetadata(this.stageCode, this.namespaceCode)
    .subscribe(
      (res: any) => {
        this.schemaMetadata = res;
        console.log(this.schemaMetadata);
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
    this.namespaceService.setSchemaResource(this.stageCode, this.namespaceCode, schema)
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
    this.namespaceService.setSchemaMetadata(this.stageCode, this.namespaceCode, schema)
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

