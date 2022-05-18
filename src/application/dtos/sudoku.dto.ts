/**
 * Author Moeid Heidari
 * Date 12 May 2022
 */
import { IsDefined, IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
/**
 * List of allowed properties in this DTO
 */
const allowedProperties = ['grid'];
/**
 * IOU request DTO
 */
export class SudokuDTO {
  /**
   * Procided Sudoku grid.
   */
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    description: 'grid',
  })
  grid: number[][];

  /**
   * get user DTO constructor
   * @param properties DTO properties
   */
  constructor(properties: any = {}) {
    Object.keys(properties).forEach((key: string) => {
      if (allowedProperties.includes(key)) this[key as keyof this] = properties[key];
    });
  }
}
