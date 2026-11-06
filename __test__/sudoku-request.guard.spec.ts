import { isSudokuRequest } from '../src/application/dtos/sudoku-request.guard';

describe('isSudokuRequest', () => {
  it('checks shape without imposing dimensions', () => {
    expect(isSudokuRequest({ grid: [] })).toBe(true);
    expect(isSudokuRequest({ grid: [[1, 2]] })).toBe(true);
  });
});
