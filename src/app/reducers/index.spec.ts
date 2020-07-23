environment.production = true;

import {
  selectedPage,
  pagesAvailable,
  localStorageSyncReducer,
  metaReducers
} from './index';
import { environment } from 'src/environments/environment';

const news = { page: 0, data: {}, pages: [] };

describe('selector', () => {
  it('should feature selector', () => {
    const a = selectedPage({ news });
    expect(a).toBeDefined(news);
  });

  it('should selector of selected page work', () => {
    const a = selectedPage({ news });
    expect(a).toBeDefined(news);
  });

  it('should selector of selected page work', () => {
    const a = pagesAvailable({ news });
    expect(a).toBeDefined(news);
  });
  it('should selector of selected page work', () => {
    const a = pagesAvailable({ news: { ...news, pages: null } });
    expect(a).toBeDefined(news);
  });
  it('should selector of selected page work', () => {
    const a = localStorageSyncReducer((state, action) => {});
    expect(a).toBeTruthy();
  });
});
