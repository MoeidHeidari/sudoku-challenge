/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { HttpStatus, Injectable } from '@nestjs/common';
import {
  HttpResponseDescriptions,
  HttpResponseMessages,
  HttpResponseTypes,
  HttpResponseTypesCodes,
} from '../../enums/httpResponse';

import { HttpResponse } from '../../interfaces';

/**
 * HTTP response service
 */
@Injectable()
export class HttpResponseService {
  //==================================================================================================
  /**
   * gets the message
   * @param status HTTP status
   * @returns message
   */
  private getMessage(status: number): string {
    return HttpResponseMessages[HttpStatus[status].toString() as keyof typeof HttpResponseMessages];
  }

  //==================================================================================================
  /**
   * gets the description
   * @param status HTTP status
   * @returns description
   */
  private getDescription(status: number): string {
    return HttpResponseDescriptions[HttpStatus[status].toString() as keyof typeof HttpResponseMessages];
  }

  //==================================================================================================
  /**
   * gets the type
   * @param status HTTP status
   * @returns type
   */
  private getType(status: number): string {
    return HttpResponseTypes[
      HttpResponseTypesCodes[Math.floor(status / 100)].toString() as keyof typeof HttpResponseTypes
    ];
  }

  //==================================================================================================
  /**
   * generates the HTTP response
   * @param status HTTP status
   * @param data data
   * @param message custom message
   * @param description custom description
   * @returns response
   */
  generate(
    status: number,
    data: unknown = {},
    message: string = this.getMessage(status),
    description: string = this.getDescription(status)
  ): HttpResponse {
    const response: HttpResponse = {
      type: this.getType(status),
      status: status,
      message: message,
      description: description,
      data: data,
    };

    return response;
  }
}
