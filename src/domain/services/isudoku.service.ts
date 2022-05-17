/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SudokuRequestDTO, SudokuResponseDTO } from '../../application/dtos';
import { EnvObjects, IntersectionOptions } from '../../infrastructure/config';
import { HttpResponseException } from '../exceptions';
import { processHttpError, validateDTO, validateOutputDTO } from '../helpers';
import { HttpResponse } from '../interfaces';
import { HttpResponseService, LoggerService } from './common';
/**
 * Intersection service
 */
@Injectable()
export class SudokuService {
  /**
   * Options for envs
   */
  private options: any = this.configService.get<IntersectionOptions>(EnvObjects.INTERSECTION_OPTIONS);
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
  async handleSudokuRequest(sudokuTable: SudokuRequestDTO): Promise<HttpResponse> {
    try {
      await validateDTO(sudokuTable, this.httpResponseService);

      const iou = await this.calculateSudoku(sudokuTable);

      const result = new SudokuResponseDTO({ iou: iou });
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
  async calculateSudoku(sudokuTable:SudokuRequestDTO
  ): Promise<SudokuRequestDTO> {
    return sudokuTable;
  }
}
