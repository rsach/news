import { TimeAgoPipe } from './time-ago.pipe';

describe('TimeAgoPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeAgoPipe();
    expect(pipe).toBeTruthy();
  });

  it('create an instance', () => {
    const d = new Date();
    const pipe = new TimeAgoPipe();
    pipe.transform(d);
    expect(pipe).toBeTruthy();
  });
});
