import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as newsReducers from '../state-management/reducers/news.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface State {
  news: newsReducers.NewState;
}

export const reducers: ActionReducerMap<State> = {
  news: newsReducers.reducer
};

export const selectFeature = (state: State) => state.news;

export const selectedPage = createSelector(
  selectFeature,
  (state: newsReducers.NewState) => state.data[state.page] || []
);
export const pagesAvailable = createSelector(
  selectFeature,
  (state: newsReducers.NewState) => state.pages || []
);

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['news'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];
