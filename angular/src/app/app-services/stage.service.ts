import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

@Injectable()
export class StageService {

  constructor() {}

  list(): Observable<{}> {
    const data = of([
      { name: 'Dev',  code: 'dev',  endpoint: environment.api_dev  },
      { name: 'Test', code: 'test', endpoint: environment.api_test  },
      { name: 'Prod', code: 'prod', endpoint: environment.api_prod  }
    ]);

    return data;
  }
}