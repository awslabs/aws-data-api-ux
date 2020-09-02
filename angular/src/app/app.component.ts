import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { SecurityService } from './app-services/security.service';
import { Identity } from './app-models/identity';
import { Observable, Subscription } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  identity$: Observable<Identity>;
  isMenuOpened: any;
  isNaked: boolean;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  layout: string;

  constructor(
    private router: Router,
    private securityService: SecurityService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit() {
    this.identity$ = this.securityService.identityObservable;
    this.isNaked = true;
    this.router.events.subscribe((data) => {
      this.isNaked = this.router.url === '/login';
    });

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  isActivePath = function (path) {
    return this.router.url.substr(0, path.length) === path;
  };
}
