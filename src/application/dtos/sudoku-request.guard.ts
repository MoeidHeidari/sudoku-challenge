import { arrayOf, isNumber, struct } from 'is-kit';

// Validate the input shape without imposing Sudoku-specific dimension or value rules.
export const isSudokuRequest = struct({ grid: arrayOf(arrayOf(isNumber)) });
