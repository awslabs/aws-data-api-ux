import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class NamespaceService {

  constructor(
    private http: HttpClient
  ) {}

  registry(endpoint: string): Observable<{}> {
    return this.http.get(endpoint + '/namespaces', {});    
  }

  info(endpoint: string, namespace: string): Observable<{}> {
    return this.http.get(endpoint + '/' + namespace + '/info', {});
  }

  provision(endpoint: string, namespace: string, payload: any): Observable<{}> {
    return this.http.put(endpoint + '/' + namespace + '/provision', payload, {});
  }

  usage(endpoint: string, namespace: string): Observable<{}> {
    return this.http.get(endpoint + '/' + namespace + '/usage', {});
  }

  getSchemaResource(endpoint: string, namespace: string): Observable<{}> {
    return this.http.get(endpoint + '/' + namespace + '/schema/Resource', {});
  }

  getSchemaMetadata(endpoint: string, namespace: string): Observable<{}> {
    return this.http.get(endpoint + '/' + namespace + '/schema/Metadata', {});
  }

  setSchemaResource(endpoint: string, namespace: string, schema: any): Observable<{}> {
    return this.http.put(endpoint + '/' + namespace + '/schema/Resource', schema, {});
  }

  setSchemaMetadata(endpoint: string, namespace: string, schema: any): Observable<{}> {
    return this.http.put(endpoint + '/' + namespace + '/schema/Metadata', schema, {});
  }
}
