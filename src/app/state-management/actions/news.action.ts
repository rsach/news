import { createAction, props } from '@ngrx/store';
import { IHits, INewsApiResponse } from 'src/app/model/news';

export const getNewsByPage = createAction(
  '[News Page] Load News',
  props<{ page: number }>()
);

export const newsLoaded = createAction(
  '[News Page] News Loaded Success',
  props<{ payload: INewsApiResponse }>()
);

export const loadingCachedNews = createAction(
  '[News Page] Cached News Load',
  props<{ page: number }>()
);

export const queryParamsChange = createAction(
  '[News Page] Query Params Change',
  props<{ page: number }>()
);

export const onAddVote = createAction(
  '[News Page] On Add Vote',
  props<{ hits: IHits }>()
);

export const onHide = createAction(
  '[News Page] On Hide News',
  props<{ hits: IHits }>()
);

export const onUpdate = createAction(
  '[News Page] On Update News',
  props<{ hits: IHits }>()
);
