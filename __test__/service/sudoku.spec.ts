/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { SudokuService } from '../../src/domain/services/sudoku.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from '../../src/infrastructure/modules/common/common.module';
import { HttpResponseService, LoggerService } from '../../src/domain/services/common';
import { validate } from 'class-validator';
import { TEST_GRID_0, TEST_GRID_1, TEST_GRID_2, TEST_GRID_3, TEST_GRID_4, TEST_GRID_6 } from '../fcatory';
describe('sudoku service', () => {
  /**
   * Make an Instantiation from Sudoku service.
   */
  let service: SudokuService;
  const config = new ConfigService();
  const logger = new LoggerService(SudokuService.name);
  const httpReponseService = new HttpResponseService();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: HttpResponseService,
          useValue: httpReponseService,
        },
        {
          provide: LoggerService,
          useValue: logger,
        },
        SudokuService,
      ],
      imports: [
        CommonModule,
        ConfigModule.forRoot({
          validate,
          isGlobal: true,
          cache: false,
          expandVariables: true,
          load: [() => ({ SudokuOptions: { number_of_decimal_places: '3' } })],
        }),
      ],
    }).compile();
    service = module.get<SudokuService>(SudokuService);
  });
  describe("sudoku calculation tests", () => {
    it("should return a solved grid", async () => {
      const result = service.begin_to_solve(TEST_GRID_0);

      expect(await result).toHaveLength(9);
    })

    it("should return not solvable", async () => {
      const result = service.begin_to_solve(TEST_GRID_1);

      expect(await result).toEqual(false);
    })

    it("should return a solved grid", async () => {
      const result = service.begin_to_solve(TEST_GRID_2);

      expect(await result).toEqual([
        [1, 4, 6, 5, 2, 8, 7, 3, 9],
        [2, 3, 8, 4, 7, 9, 6, 5, 1],
        [7, 5, 9, 1, 3, 6, 2, 4, 8],
        [6, 8, 2, 7, 9, 5, 4, 1, 3],
        [4, 7, 1, 2, 8, 3, 9, 6, 5],
        [5, 9, 3, 6, 1, 4, 8, 7, 2],
        [9, 1, 4, 8, 5, 7, 3, 2, 6],
        [8, 2, 7, 3, 6, 1, 5, 9, 4],
        [3, 6, 5, 9, 4, 2, 1, 8, 7]
      ]);
    })

    it("should return a solved grid", async () => {
      const result = service.begin_to_solve(TEST_GRID_3);

      expect(await result).toHaveLength(9);
    })

    it("should return a solved grid", async () => {
      const result = service.check_if_can_be_used_in_Column(TEST_GRID_4,4,2);

      expect(await result).toEqual(true);
    })

    it("should return a solved grid", async () => {
      const result = service.check_if_can_be_used_in_Square(TEST_GRID_6,1,1,1);

      expect(await result).toEqual(true);
    })
  })

});