import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Stage {
    name: string, 
    code: string,
    endpoint: string
}

@Injectable({
    providedIn: 'root'
})
export class StageService {

    configs: Observable<Stage[]>;

    constructor(private httpClient: HttpClient) { }

    // Get configs from server | HTTP GET
    list(): Observable<Stage[]> {

        // Cache it once if configs value is false
        if (!this.configs) {
            this.configs = this.httpClient.get(environment.discoveryUrl).pipe(
                map(data => {
                  let result = [];
                  for (let key in data) {
                    let stageData = data[key];
                    let baseEndpoint = stageData.URL ?? stageData.Endpoint;
                    let endpoint = stageData.Stage.toLowerCase() === 'prod' ? baseEndpoint : baseEndpoint + '/' + stageData.Stage;
                    result.push({ name: stageData.Stage,  code: stageData.Stage,  endpoint: endpoint });
                   }
                  return result;
                }),
                publishReplay(1), // this tells Rx to cache the latest emitted
                refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
            );
        }

        return this.configs;
    }

    // Clear configs
    clearCache() {
        this.configs = null;
    }
}
