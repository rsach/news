import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import {
  map,
  catchError,
  tap,
  switchMap,
  withLatestFrom,
  debounceTime
} from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import * as newActions from '../actions/news.action';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers/index';
@Injectable()
export class NewsEffects {
  pages$ = this.store.pipe(select(fromRoot.pagesAvailable));

  loadNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newActions.getNewsByPage),
      withLatestFrom(this.pages$),
      switchMap(([action, pages]) => {
        if (pages.indexOf(+action.page) > -1) {
          return of(newActions.loadingCachedNews({ page: action.page }));
        }

        return this.apiService.get({ page: action.page }).pipe(
          map(res => newActions.newsLoaded({ payload: res })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  loadNewsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newActions.newsLoaded),
      map(res => newActions.queryParamsChange({ page: res.payload.page }))
    )
  );

  cachedNewsLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newActions.loadingCachedNews),
      map(({ page }) => newActions.queryParamsChange({ page }))
    )
  );

  queryParamsChange$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(newActions.queryParamsChange),
        tap(({ page }) => {
          this.router.navigate(['.'], {
            relativeTo: this.ar,
            queryParams: { page }
          });
        })
      ),
    { dispatch: false }
  );

  onAddVote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newActions.onAddVote),
      switchMap(({ hits }) => {
        const newHits = { ...hits };
        newHits.vote = newHits.vote || 0;
        newHits.vote += 1;

        return of(newActions.onUpdate({ hits: newHits }));
      })
    )
  );
  onHide$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newActions.onHide),
      switchMap(({ hits }) => {
        const newHits = { ...hits };
        newHits.hide = true;

        return of(newActions.onUpdate({ hits: newHits }));
      })
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private router: Router,
    private ar: ActivatedRoute,
    private store: Store
  ) {}
}
