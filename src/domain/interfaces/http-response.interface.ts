/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
export interface HttpResponse {
  /**
   * Represents the type of the response
   */
  type: string;
  /**
   * Represents the status code of the http response(https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
   */
  status: number;
  /**
   * Represents a short message about the response status.
   */
  message: string;
  /**
   * Represents a full description about the response (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
   */
  description: string;
  /**
   * Represents the actual data which is returned by the API. In case of empty response we will have it empty also.
   */
  data: any;
}
