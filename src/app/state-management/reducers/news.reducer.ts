import { Action, createReducer, on } from '@ngrx/store';
import * as newsActions from '../actions/news.action';
import { IHits } from '../../model/news';

export interface NewState {
  page: number;
  pages: number[];
  data: {
    [id: number]: IHits[];
  };
}
export const initialState: NewState = {
  page: 0,
  pages: [],
  data: {}
};

const newsReducer = createReducer(
  initialState,
  on(newsActions.newsLoaded, (state, { payload }) => ({
    page: payload.page,
    pages: Array.from(new Set([...state.pages, payload.page])),
    data: { ...state.data, [payload.page]: payload.hits }
  })),
  on(newsActions.loadingCachedNews, (state, { page }) => ({
    ...state,
    page
  })),
  on(newsActions.onUpdate, (state, { hits }) => {
    const news = state.data[state.page].filter(
      res => res.objectID !== hits.objectID
    );
    const index = state.data[state.page]
      .map(res => res.objectID)
      .indexOf(hits.objectID);
    const newHit = { ...hits };
    const newData = { ...state.data };
    newData[state.page] = [
      ...news.slice(0, index),
      newHit,
      ...news.slice(index)
    ];
    return {
      ...state,
      data: newData
    };
  })
);

export function reducer(state: NewState | undefined, action: Action) {
  return newsReducer(state, action);
}
