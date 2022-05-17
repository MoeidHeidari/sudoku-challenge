/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { HttpResponseException } from '../exceptions';

//==================================================================================================
/**
 * processes http error that was throwed by service
 * @param error error (exception or string)
 * @param logger logger service
 */
export function processMicroserviceHttpError(error: any, logger: any) {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = undefined;
  let description = undefined;
  let data: any = {};
  let body: any = {};

  if (error instanceof Object && error.response) {
    if (error.response._body) body = error.response._body;
    if (error.response.data) body = error.response;
    if (error.response.statusCode) statusCode = error.response.statusCode;
    if (body.data) data = body.data;
    if (body.message) message = body.message;
    if (body.description) description = body.description;
    return { statusCode, message, description, data };
  }

  if (typeof error == 'string' || error instanceof Object) logger.error(error);

  if (error instanceof Error) logger.error(error.message, error);

  return { statusCode, message, description, data };
}

//==================================================================================================
/**
 * processes http error that was throwed by service
 * @param error error (exception or string)
 * @param logger logger service
 */
export function processHttpError(error: any, logger: any) {
  if (error instanceof HttpResponseException) throw error;

  if (typeof error == 'string') logger.error(error);

  if (error instanceof Error) logger.error(error.message, error);
}

//==================================================================================================
/**
 * validates dto and returns bad request if it is wrong
 * @param dto dto
 * @param httpResponseGenerator http response service
 */
export async function validateDTO(dto: any, httpResponseGenerator: any): Promise<any> {
  const errors = await validate(dto);

  if (errors.length) throw new HttpResponseException(httpResponseGenerator.generate(HttpStatus.BAD_REQUEST, errors));

  return dto;
}

//==================================================================================================
/**
 * validates output dto and throws an error if it is wrong
 * @param dto dto
 * @param logger logger service
 */
export async function validateOutputDTO(dto: any, logger: any): Promise<any> {
  const errors = await validate(dto);

  if (errors.length) {
    for (const i in errors) {
      logger.error(errors[i]);
    }
  }

  return dto;
}

//==================================================================================================
