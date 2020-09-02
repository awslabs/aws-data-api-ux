import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { map, catchError, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonReferenceBookService {

  constructor(private translateService: TranslateService) { }

  loadCurrencies(): Observable<{}> {
    const data = of([
      { name: 'CAD', code: 'CAD' },
      { name: 'EUR', code: 'EUR' },
      { name: 'GBP', code: 'GBP' },
      { name: 'USD', code: 'USD' }
    ]);

    return data;
  }

  processTranslations(area: string, propertyName: string, observable: Observable<{}>): Observable<{}> {
    return observable.pipe(
      concatMap((items: any[]) => {
        const observables = [];
        items.forEach(item => {
          const op = this.translateService.get(area + '.' + item[propertyName]).pipe(
            map((translation: any) => {
              item.name = translation;
              return item;
            })
          );
          observables.push(op);
        });
        return forkJoin(observables);
      })
    );
  }
}
