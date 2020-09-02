import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';
import { Identity } from '../app-models/identity';

@Injectable()
export class SecurityService {

  private identity: BehaviorSubject<Identity>;
  public identityObservable: Observable<Identity>;

  constructor(private http: HttpClient) {
    const value = localStorage.getItem('identity');
    this.identity = new BehaviorSubject<Identity>(value && JSON.parse(value));
    this.identityObservable = this.identity.asObservable();
  }

  getIdentity(): Identity {
    return this.identity.getValue();
  }

  login(identity: Identity): void {
    localStorage.setItem('identity', JSON.stringify(identity));
    this.identity.next(identity);
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      this.identity.next(null);
      localStorage.removeItem('identity');
  }

  requestIdentity(data: any): Observable<Identity> {
    return this.http.post<Identity>(environment.discoveryUrl + '/security', data);
  }
}
