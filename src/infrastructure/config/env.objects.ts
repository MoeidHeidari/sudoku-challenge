/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { expandEnvVariables } from '../../domain/helpers';

expandEnvVariables();

/**
 * options enum
 */
export enum EnvObjects {
  SUDOKU_OPTIONS = 'SudokuOptions',
}
//===================================================================================================
/**
 * Sudoku options
 */
export interface SudokuOptions {
  /**
   * represents the dimension of the sudoku.
   */
  dimenstion: number;
}

/**
 * configuration function
 * @returns configuration taken from env
 */
export const configuration = (): any => ({
  SudokuOptions: {
    dimenstion: process.env.DIMENSION,
  },
});
