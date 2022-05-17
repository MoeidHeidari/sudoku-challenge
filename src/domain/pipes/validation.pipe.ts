/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { ValidationError, ValidatorOptions } from 'class-validator';
/**
 * env variables validation pipeline
 */
export interface ValidationPipeOptions extends ValidatorOptions {
  /**
   * If it should be transformed
   */
  transform?: boolean;
  /**
   * If error messages should be disabled
   */
  disableErrorMessages?: boolean;
  /**
   * Exception factory
   */
  exceptionFactory?: (errors: ValidationError[]) => any;
}
