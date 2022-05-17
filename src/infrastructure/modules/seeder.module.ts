/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration, validate } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate,
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
  ],
  controllers: [],
})
export class SeederModule {}
