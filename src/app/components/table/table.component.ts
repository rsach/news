import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  PLATFORM_ID,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as newsActions from '../../state-management/actions/news.action';
import * as fromRoot from '../../reducers';
import { isPlatformBrowser } from '@angular/common';
import { Observable, Subscription, pipe } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy {
  hits$ = this.store.pipe(select(fromRoot.selectedPage));
  unsub: Subscription[] = [];

  constructor(
    private ar: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    const unsub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(res => {
        const page = +this.ar.snapshot.queryParams.page || 0;
        this.store.dispatch(newsActions.getNewsByPage({ page }));
      });
    this.unsub.push(unsub);
  }

  ngOnDestroy(): void {
    this.unsub.forEach(res => res.unsubscribe());
  }

  onPrevious(): void {
    const params = { ...this.ar.snapshot.queryParams };
    params.page = +params.page ? +params.page - 1 : 0;

    this.store.dispatch(newsActions.getNewsByPage({ page: params.page }));
  }

  onNext(): void {
    const params = { ...this.ar.snapshot.queryParams };
    params.page = +params.page + 1;
    this.store.dispatch(newsActions.getNewsByPage({ page: params.page }));
  }

  onVote(hits): void {
    this.store.dispatch(newsActions.onAddVote({ hits }));
  }

  onHide(hits): void {
    this.store.dispatch(newsActions.onHide({ hits }));
  }
}
