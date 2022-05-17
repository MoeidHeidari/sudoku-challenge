/**
 * Author Moeid Heidari
 * Date 12 May 2022
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';
/**
 * List of allowed properties in this DTO
 */
const allowedProperties = ['grid'];
/**
 * Sudoku response DTO
 */
export class SudokuResponseDTO {
  /**
   * Calculated Sudoku result value
   */
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Calculated sudoku',
  })
  grid: number[][];
  /**
   * Contructs the DTO based on the provided properties after validation success.
   * @param properties list of allowed properties
   */
  constructor(properties: any = {}) {
    Object.keys(properties).forEach((key: string) => {
      if (allowedProperties.includes(key)) this[key as keyof this] = properties[key];
    });
  }
}
