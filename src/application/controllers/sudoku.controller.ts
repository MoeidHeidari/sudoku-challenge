/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Get,
  Header,
  CacheInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { HttpResponse } from '../../domain/interfaces';
import { Public } from '../../domain/decorators';
import { SudokuService } from '../../domain/services/sudoku.service';
import { SudokuDTO } from '../dtos';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { isSudokuRequest } from '../dtos/sudoku-request.guard';
import { HttpResponseException } from '../../domain/exceptions';
import { HttpResponseService } from '../../domain/services/common';
/**
 * Sudoku controller
 */
@Controller('api/v1/sudoku')
@UseInterceptors(CacheInterceptor)
export class SudokuController {
  /**
   * Sudoku controller class constructor
   * @param sudokuService Sudoku service
   */
  constructor(
    private readonly sudokuService: SudokuService,
    private readonly httpResponseService: HttpResponseService
  ) {}

  //===========================================================================================================================
  /**
   * Entrypoint of the Sudoku API
   * @returns Text
   */
  @ApiOperation({ summary: 'Entry point for Sudoku API' })
  @ApiResponse({
    status: 200,
    description: 'Returns back the calculated Sudoku',
    type: String,
  })
  @Get()
  @Public()
  async() {
    return 'Welcome to Sudoko solver endpoint';
  }
  //===========================================================================================================================
  /**
   * Takes the cells of a sudoku table and tries to calculate and returnback.
   * @param body Sudoku grid
   * @returns HTTPReponse
   */
  @ApiOperation({ summary: 'Calaculates the sudoku table' })
  @ApiResponse({
    status: 200,
    description: 'Returns back the calculated Sudoko',
    type: SudokuDTO,
  })
  @ApiBody({ type: [SudokuDTO] })
  @Header('content-type', 'application/json')
  @Post()
  @HttpCode(HttpStatus.OK)
  @Public()
  async sudoku(@Body() body: unknown): Promise<HttpResponse> {
    if (!isSudokuRequest(body)) {
      throw new HttpResponseException(
        this.httpResponseService.generate(HttpStatus.BAD_REQUEST, [
          { property: 'grid', constraints: { isGrid: 'grid must be an array of arrays of numbers' } },
        ])
      );
    }
    const response: HttpResponse = await this.sudokuService.handleSudokuRequest(new SudokuDTO(body));
    return response;
  }
}
