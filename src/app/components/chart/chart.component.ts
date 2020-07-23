import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  Inject,
  PLATFORM_ID,
  OnDestroy
} from '@angular/core';
import Chart from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { IHits } from 'src/app/model/news';
import { ApiService } from 'src/app/services/api.service';
import { chartConfig } from './chartConfig';
import * as fromRoot from '../../reducers/index';
import { select, Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chart') chart: ElementRef;
  hits$ = this.store.pipe(select(fromRoot.selectedPage));
  isBrowser: boolean;
  unsub: Subscription[] = [];

  constructor(private store: Store, @Inject(PLATFORM_ID) platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }
    const chart = new Chart(this.chart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            fill: false,

            data: []
          }
        ]
      },

      options: chartConfig
    });
    const unsub = this.hits$.subscribe((res: IHits[]) => {
      const labels = res.map(d => d.objectID);
      const vote = res.map(d => d.points);
      chart.config.data = { labels, datasets: [{ data: vote, fill: false }] };
      chart.update();
    });
    this.unsub.push(unsub);
  }

  ngOnDestroy(): void {
    this.unsub.forEach(res => res.unsubscribe());
  }
}
