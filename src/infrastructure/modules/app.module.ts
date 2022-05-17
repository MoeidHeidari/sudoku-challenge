/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../config/env.objects';
import { validate } from '../config/env.validation';

import { LoggerInterceptor } from '../../domain/interceptors';
import { RolesGuard } from '../../domain/guards';
import * as modules from '../../domain/modules';
import { CommonModule } from './common/common.module';
import { PrometheusModule } from "@willsoto/nestjs-prometheus";

/**
 * application modules list
 */
const modulesList = Object.keys(modules).map(moduleIndex => modules[moduleIndex as keyof typeof modules]);

/**
 * application module
 */
@Module({
  imports: [
    PrometheusModule.register(),
    CacheModule.register(),
    CommonModule,
    ConfigModule.forRoot({
      load: [configuration],
      validate,
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    ...modulesList,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
  controllers: [],
})
export class AppModule { }
