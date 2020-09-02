import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class ResourceService {

  constructor(
    private http: HttpClient
  ) {}

  getEndpoint(stage: string, namespace: string) {
    return environment['api_' + stage] + '/' + namespace;
  }

  find(stage: string, namespace: string, last_token: string = '0', page_size: number = 10, search: any): Observable<{}> {
    search.limit = page_size;
    if(last_token !== '0') {
      search.ExclusiveStartKey = last_token;
    }
    
    return this.http.post(this.getEndpoint(stage, namespace)  + '/find', search, {});
  }

  list(stage: string, namespace: string, last_token: string = '0', page_size: number = 10): Observable<{}> {
    let params = new HttpParams().set("limit", page_size.toString());
    console.log('last-token', last_token);
    if(last_token !== '0') {
      params = params.set("LastEvaluatedKey",last_token);
    }

    return this.http.get(this.getEndpoint(stage, namespace)  + '/list', { params: params });
  }
}