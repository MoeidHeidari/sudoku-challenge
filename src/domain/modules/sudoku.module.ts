/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { CacheModule, Module } from '@nestjs/common';
import { CommonModule } from '../../infrastructure/modules/common/common.module';
import { SudokuController } from '../../application/controllers';
import { SudokuService } from '../services/isudoku.service';
/**
 * User module
 */
@Module({
  imports: [CommonModule,CacheModule.register(),],
  controllers: [SudokuController],
  providers: [SudokuService],
  exports: [SudokuService],
})
export class SudokuModule {}
