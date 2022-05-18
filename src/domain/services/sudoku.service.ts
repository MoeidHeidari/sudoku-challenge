/**
 * Author Moeid Heidari
 * Date 17 May 2-122
 */
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SudokuDTO } from '../../application/dtos';
import { EnvObjects, SudokuOptions } from '../../infrastructure/config';
import { HttpResponseException } from '../exceptions';
import { processHttpError, validateDTO, validateOutputDTO } from '../helpers';
import { HttpResponse } from '../interfaces';
import { HttpResponseService, LoggerService } from './common';
/**
 * Sudoku service
 */
@Injectable()
export class SudokuService {
  /**
   * Options for envs
   */
  private options: any = this.configService.get<SudokuOptions>(EnvObjects.SUDOKU_OPTIONS);
  //===========================================================================================
  /**
   * Constructor of the sudoku service class
   * @param httpResponseService Http response service
   * @param configService Config service
   * @param logger Logger service
   */
  constructor(
    private readonly httpResponseService: HttpResponseService,
    private readonly configService: ConfigService,
    private readonly logger: LoggerService
  ) {}
  //===========================================================================================
  /**
   * Handles the Sudoku request
   * @param sudokuTable sudokuTable
   * @returns HTTPResponse
   */
  async handleSudokuRequest(sudokuTable: SudokuDTO): Promise<HttpResponse> {
    try {
      await validateDTO(sudokuTable, this.httpResponseService);
      const calculatedGrid = await this.calculateSudoku(sudokuTable);
      const result = new SudokuDTO({ grid: calculatedGrid });
      await validateOutputDTO(result, this.logger);
      return this.httpResponseService.generate(HttpStatus.OK, result);
    } catch (error) {
      processHttpError(error, this.logger);
      throw new HttpResponseException(this.httpResponseService.generate(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }
  //===========================================================================================
  /**
   * Takes the sudoku table
   * @param ground_truth_bounding_box rows of the sudoku table
   * @returns 2d array
   */
  async calculateSudoku(sudokuGrid: SudokuDTO): Promise<any> {
    const grid = sudokuGrid.grid;
    return await this.begin_to_solve(grid);
  }
  //================================================================================================================================
  /**
   * Finds and returns an empty cell.
   * @param sudokuGrid Provided grid.
   * @returns address of the empty cell.
   */
  async searchForEmptyCell(grid: number[][]): Promise<number[]> {
    const emptyCellCoordinate = [-1, -1];
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid.length; y++) {
        if (grid[x][y] === 0) {
          emptyCellCoordinate[0] = x;
          emptyCellCoordinate[1] = y;
          return emptyCellCoordinate;
        }
      }
    }
    return emptyCellCoordinate;
  }
  //================================================================================================================================
  /**
   * check is a specific value can be used in a row
   * @param grid provided grid
   * @param row row to be checked
   * @param value value to be used in the row
   * @returns boolean
   */
  async check_if_can_be_used_in_row(grid: number[][], row: number, value: number): Promise<boolean> {
    for (let x = 0; x < grid.length; x++) {
      if (grid[row][x] === value) {
        return true;
      }
    }

    return false;
  }
  //================================================================================================================================
  /**
   * check is a specific value can be used in a column
   * @param grid provided grid
   * @param column column to be checked
   * @param value value to be used in the row
   * @returns boolean
   */
  async check_if_can_be_used_in_Column(grid: number[][], column: number, value: number): Promise<boolean> {
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][column] === value) {
        return true;
      }
    }

    return false;
  }
  //================================================================================================================================
  /**
   * check is a specific value can be used in a 3x3 square
   * @param grid provided grid
   * @param row row to be checked
   * @param column column to be checked
   * @param value value to be used in the row
   * @returns boolean
   */
  async check_if_can_be_used_in_Square(grid: number[][], row: number, column: number, value: number): Promise<boolean> {
    row -= row % 3;
    column -= column % 3;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (grid[x + row][y + column] === value) {
          return true;
        }
      }
    }
    return false;
  }
  //================================================================================================================================
  /**
   *
   * @param grid provided grid
   * @param row row to be checked
   * @param column
   * @param value
   * @returns
   */
  async check_correct_position(grid: number[][], row: number, column: number, value: number): Promise<boolean> {
    return (
      !(await this.check_if_can_be_used_in_Column(grid, column, value)) &&
      !(await this.check_if_can_be_used_in_row(grid, row, value)) &&
      !(await this.check_if_can_be_used_in_Square(grid, row, column, value))
    );
  }
  //================================================================================================================================
  /**
   * Begins to solve the Sudoku grid.
   * @param grid provided grid.
   * @returns
   */
  async begin_to_solve(grid: number[][]): Promise<any> {
    const [row, column] = await this.searchForEmptyCell(grid);
    if (row === -1 && column === -1) {
      return true;
    }

    for (let value = 1; value <= grid.length; value++) {
      if (await this.check_correct_position(grid, row, column, value)) {
        grid[row][column] = value;
        if (await this.begin_to_solve(grid)) {
          return grid;
        }
        grid[row][column] = 0;
      }
    }
    return false;
  }
}
