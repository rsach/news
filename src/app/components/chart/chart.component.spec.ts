import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../reducers/index';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: fromRoot.selectedPage,
              value: [{ points: 1, objectID: 'fd' }]
            }
          ]
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ page: 1 }),
            snapshot: { queryParams: { page: 1 } }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not trigger if server', () => {
    component.isBrowser = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not trigger if server', () => {
    component.isBrowser = true;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
