/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { Injectable, Logger, LoggerService as NestLoggerService } from '@nestjs/common';
import { formatWithOptions } from 'util';

/**
 * service for logging
 */
@Injectable()
export class LoggerService implements NestLoggerService {
  /**
   * logger
   */
  private readonly logger: Logger;
  /**
   * context
   */
  private readonly context?: string;
  //=============================================================================================================
  /**
   * constructor for the logger
   * @param context
   */
  constructor(context: string) {
    this.logger = new Logger(context);
    this.context = context;
  }
  //=============================================================================================================
  /**
   * creates the logger
   * @param context context
   * @returns logger
   */
  static createlogger(context: string): LoggerService {
    return new LoggerService(context);
  }
  //=============================================================================================================
  /**
   * logs the message
   * @param message message
   * @param args arguments
   */
  public log(message: string, ...args: any[]) {
    this.logger.log(this.format(message, args));
  }
  //=============================================================================================================
  /**
   * logs the error message
   * @param message message
   * @param error error
   * @param args arguments
   */
  public error(message: string, error?: string | Error, ...args: any[]) {
    this.logger.error(this.format(message, args), error instanceof Error ? error.stack : error);
  }
  //=============================================================================================================
  /**
   * logs the warning message
   * @param message message
   * @param args arguments
   */
  public warn(message: string, ...args: any[]) {
    this.logger.warn(this.format(message, args));
  }
  //=============================================================================================================
  /**
   * logs the debug message
   * @param message message
   * @param args arguments
   */
  public debug(message: string, ...args: any[]) {
    this.logger.debug(this.format(message, args));
  }
  //=============================================================================================================
  /**
   * logs the verbose message
   * @param message message
   * @param args arguments
   */
  public verbose(message: string, ...args: any[]) {
    this.logger.verbose(this.format(message, args));
  }
  //=============================================================================================================
  /**
   * formats the message
   * @param message message
   * @param args arguments
   * @returns formatted message
   */
  private format(message: string, args?: string[]) {
    if (!args || !args.length) return message;

    return formatWithOptions({ colors: true, depth: 5 }, message, ...args);
  }
  //=============================================================================================================
}
