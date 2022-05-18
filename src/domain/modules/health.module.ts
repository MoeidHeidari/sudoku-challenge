/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from '../../application/controllers/health.controller';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
})
export class HealthModule {}
