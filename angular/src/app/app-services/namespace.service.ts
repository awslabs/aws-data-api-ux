import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class NamespaceService {

  constructor(
    private http: HttpClient
  ) {}

  getEndpoint(stage: string, namespace: string) {
    return environment['api_' + stage] + '/' + namespace;
  }

  registry(stage: string): Observable<{}> {
    return this.http.get(environment['api_' + stage] + '/registry', {});
  }

  info(stage: string, namespace: string): Observable<{}> {
    return this.http.get(this.getEndpoint(stage, namespace) + '/info', {});
  }

  provision(stage: string, namespace: string, payload: any): Observable<{}> {
    return this.http.put(this.getEndpoint(stage, namespace) + '/provision', payload, {});
  }

  usage(stage: string, namespace: string): Observable<{}> {
    return this.http.get(this.getEndpoint(stage, namespace) + '/usage', {});
  }

  getSchemaResource(stage: string, namespace: string): Observable<{}> {
    return this.http.get(this.getEndpoint(stage, namespace) + '/schema/Resource', {});
  }

  getSchemaMetadata(stage: string, namespace: string): Observable<{}> {
    return this.http.get(this.getEndpoint(stage, namespace) + '/schema/Metadata', {});
  }

  setSchemaResource(stage: string, namespace: string, schema: any): Observable<{}> {
    return this.http.put(this.getEndpoint(stage, namespace) + '/schema/Resource', schema, {});
  }

  setSchemaMetadata(stage: string, namespace: string, schema: any): Observable<{}> {
    return this.http.put(this.getEndpoint(stage, namespace) + '/schema/Metadata', schema, {});
  }
}
