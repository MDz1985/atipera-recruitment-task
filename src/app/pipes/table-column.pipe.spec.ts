import { TableColumnPipe } from 'src/app/pipes/table-column.pipe';

describe('TableTitlesPipe', () => {
  it('create an instance', () => {
    const pipe = new TableColumnPipe();
    expect(pipe).toBeTruthy();
  });
});
