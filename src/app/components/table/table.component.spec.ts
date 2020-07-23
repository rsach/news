import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../reducers/index';
import * as fromActions from '../../state-management/actions/news.action';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: fromRoot.selectedPage, value: [] }]
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
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get page number 1', () => {
    fixture.detectChanges();
    const a = fromActions.getNewsByPage({ page: 1 });
    expect(store.dispatch).toHaveBeenCalledWith(a);
  });

  it('should render zero tr', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('tbody').children.length).toBe(0);
  });

  it('should get next page', () => {
    component.onNext();
    fixture.detectChanges();
    const a = fromActions.getNewsByPage({ page: 2 });
    expect(store.dispatch).toHaveBeenCalledWith(a);
  });

  it('should get previous page', () => {
    fixture.detectChanges();
    component.onPrevious();
    const a = fromActions.getNewsByPage({ page: 0 });
    expect(store.dispatch).toHaveBeenCalledWith(a);
  });

  it('should get previous page not less than 0', () => {
    TestBed.inject(ActivatedRoute).queryParams = of({});
    fixture.detectChanges();
    const a = fromActions.getNewsByPage({ page: 0 });
    expect(store.dispatch).toHaveBeenCalledWith(a);
    TestBed.inject(ActivatedRoute).snapshot.queryParams = { page: 0 };
    fixture.detectChanges();
    component.onPrevious();
    expect(store.dispatch).toHaveBeenCalledWith(a);
  });

  it('should add vote', () => {
    fixture.detectChanges();
    const hits = null;
    component.onVote(hits);
    const a = fromActions.onAddVote({ hits });
    expect(store.dispatch).toHaveBeenCalledWith(a);
  });

  it('should hide element', () => {
    fixture.detectChanges();
    const hits = null;
    component.onHide(hits);
    const a = fromActions.onHide({ hits });
    expect(store.dispatch).toHaveBeenCalledWith(a);
  });
});
