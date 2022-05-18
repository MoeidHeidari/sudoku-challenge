/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { MqttContext } from '@nestjs/microservices';
import { LoggerService } from '../services/common';
////////////////////////////////////////////////////////////////////////
/**
 * Logs the requests
 */
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  //==================================================================================================
  /**
   * logs requests for the service
   */
  private readonly logger: LoggerService = new LoggerService(LoggerInterceptor.name);

  //==================================================================================================
  /**
   * intercept handler
   * @param context context
   * @param next next call
   * @returns handler
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const contextType = context.getType();

    return next.handle().pipe(
      tap(
        () => {
          if (contextType === 'http') {
            this.logHttpRequest(context, startTime);
          } else if (contextType === 'rpc') {
            this.logRpcMessage(context, startTime);
          }
        },
        (error: Error) => {
          if (contextType === 'http') {
            this.logHttpRequest(context, startTime);
          } else {
            const reqTime = Date.now() - startTime;
            this.logger.log(`[${error.name}] ${error.message} ${reqTime}ms`);
          }
        }
      )
    );
  }

  //==================================================================================================
  /**
   * logs the HTTP requests
   * @param context context
   * @param startTime start time
   * @returns nothing
   */
  private logHttpRequest(context: ExecutionContext, startTime: number) {
    if (context.getType() !== 'http') return;
    const reqTime = Date.now() - startTime;
    const controllerName = context.getClass().name;
    const handlerName = context.getHandler().name;
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { url, method } = request;
    const { statusCode } = response;
    this.logger.log(
      `[HTTP] ${method.toUpperCase()} ${url} ${statusCode} [${controllerName}:${handlerName}] ${reqTime}ms`
    );
  }

  //==================================================================================================
  /**
   * logs the RTC requests
   * @param context context
   * @param startTime start time
   * @returns nothing
   */
  private logRpcMessage(context: ExecutionContext, startTime: number) {
    if (context.getType() !== 'rpc') return;
    const reqTime = Date.now() - startTime;
    const controllerName = context.getClass().name;
    const handlerName = context.getHandler().name;
    const args = context.getArgs();
    if (args[1] && args[1] instanceof MqttContext) {
      this.logMqttMessage(args[1], startTime, reqTime, controllerName, handlerName);
    } else {
      this.logKafkaMessage(context, startTime, reqTime, controllerName, handlerName, args);
    }
  }

  //==================================================================================================
  /**
   * logs the KAFKA requests
   * @param context context
   * @param startTime start time
   * @returns nothing
   */
  private logKafkaMessage(
    context: ExecutionContext,
    startTime: number,
    reqTime: number,
    controllerName: string,
    handlerName: string,
    args: any
  ) {
    for (const arg of args) {
      if (!arg.args) {
        this.logger.log(`[KAFKA] ${arg.partition} ${arg.topic} [${controllerName}:${handlerName}] ${reqTime}ms`);
      }
    }
  }

  //==================================================================================================
  /**
   * logs the MQTT requests
   * @param context context
   * @param startTime start time
   * @returns nothing
   */
  private logMqttMessage(
    context: MqttContext,
    startTime: number,
    reqTime: number,
    controllerName: string,
    handlerName: string
  ) {
    const packet = context.getPacket();
    this.logger.log(`[MQTT] ${packet.cmd} ${context.getTopic()} [${controllerName}:${handlerName}] ${reqTime}ms`);
  }

  //==================================================================================================
}
