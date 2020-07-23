import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../reducers/index';
import * as fromActions from '../../state-management/actions/news.action';

// const data = {"created_at":"2018-03-14T03:50:30.000Z","title":"Stephen Hawking has died","url":"http://www.bbc.com/news/uk-43396008","author":"Cogito","points":6015,"story_text":null,"comment_text":null,"num_comments":436,"story_id":null,"story_title":null,"story_url":null,"parent_id":null,"created_at_i":1520999430,"relevancy_score":8012,"_tags":["story","author_Cogito","story_16582136"],"objectID":"16582136","_highlightResult":{"title":{"value":"Stephen Hawking has died","matchLevel":"none","matchedWords":[]},"url":{"value":"http://www.bbc.com/news/uk-43396008","matchLevel":"none","matchedWords":[]},"author":{"value":"Cogito","matchLevel":"none","matchedWords":[]}}}

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
    const fixture = TestBed.createComponent(TableComponent);
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
    TestBed.get(ActivatedRoute).queryParams = of({});
    fixture.detectChanges();
    const a = fromActions.getNewsByPage({ page: 0 });
    expect(store.dispatch).toHaveBeenCalledWith(a);
    TestBed.get(ActivatedRoute).snapshot.queryParams = { page: 0 };
    fixture.detectChanges();
    component.onPrevious();
    expect(store.dispatch).toHaveBeenCalledWith(a);
  });

  it('should add vote', () => {
    fixture.detectChanges();
    const hits = null;
    component.onVote(hits);
    const a = fromActions.onAddVote({ hits: hits });
    expect(store.dispatch).toHaveBeenCalledWith(a);
  });

  it('should hide element', () => {
    fixture.detectChanges();
    const hits = null;
    component.onHide(hits);
    const a = fromActions.onHide({ hits: hits });
    expect(store.dispatch).toHaveBeenCalledWith(a);
  });
});
