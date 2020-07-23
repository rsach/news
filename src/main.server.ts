import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
const fakeStorage: Storage = {
  length: 0,
  clear: () => {},
  getItem: (_key: string) => null,
  key: (_index: number) => null,
  removeItem: (_key: string) => {},
  setItem: (_key: string, _data: string) => {}
};

// const domino = require('domino');

// const win = domino.createWindow(template);
// (global as any)['window'] = win;
// (global as any)['document'] = win.document;
// (global as any)['navigator'] = win.navigator;
(global as any)['localStorage'] = fakeStorage;

export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
