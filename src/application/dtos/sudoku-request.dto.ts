/**
 * Author Moeid Heidari
 * Date 12 May 2022
 */
import { IsDefined, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
/**
 * List of allowed properties in this DTO
 */
const allowedProperties = ['grid'];
/**
 * IOU request DTO
 */
export class SudokuRequestDTO {
  /**
   * Procided Sudoku grid.
   */
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
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
