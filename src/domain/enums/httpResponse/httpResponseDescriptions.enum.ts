/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
export enum HttpResponseDescriptions {
  CONTINUE = 'The client SHOULD continue with its request',
  SWITCHING_PROTOCOLS = "The server understands and is willing to comply with the client's request, via the Upgrade message header field, for a change in the application protocol being used on this connection",
  PROCESSING = 'The 102 (Processing) status code is an interim response used to inform the client that the server has accepted the complete request, but has not yet completed it',

  OK = 'The request has succeeded',
  CREATED = 'The request has been fulfilled and resulted in a new resource being created',
  ACCEPTED = 'The request has been accepted for processing, but the processing has not been completed',
  NON_AUTHORITATIVE_INFORMATION = 'The returned metainformation in the entity-header is not the definitive set as available from the origin server, but is gathered from a local or a third-party copy',
  NO_CONTENT = 'The server has fulfilled the request but does not need to return an entity-body, and might want to return updated metainformation',
  RESET_CONTENT = 'The server has fulfilled the request and the user agent SHOULD reset the document view which caused the request to be sent',
  PARTIAL_CONTENT = 'The server has fulfilled the partial GET request for the resource',

  AMBIGUOUS = 'The requested resource corresponds to any one of a set of representations, each with its own specific location, and agent- driven negotiation information (section 12) is being provided so that the user (or user agent) can select a preferred representation and redirect its request to that location',
  MOVED_PERMANENTLY = 'The requested resource has been assigned a new permanent URI and any future references to this resource SHOULD use one of the returned URIs',
  FOUND = 'The requested resource resides temporarily under a different URI',
  SEE_OTHER = 'The response to the request can be found under a different URI and SHOULD be retrieved using a GET method on that resource',
  NOT_MODIFIED = 'If the client has performed a conditional GET request and access is allowed, but the document has not been modified, the server SHOULD respond with this status code',
  TEMPORARY_REDIRECT = 'The requested resource resides temporarily under a different URI',
  PERMANENT_REDIRECT = 'The request, and all future requests should be repeated using another URI',

  BAD_REQUEST = 'The request could not be understood by the server due to malformed syntax',
  UNAUTHORIZED = 'The request requires user authentication',
  PAYMENT_REQUIRED = 'This code is reserved for future use.',

  FORBIDDEN = 'The server understood the request, but is refusing to fulfill it',
  NOT_FOUND = 'The server has not found anything matching the Request-URI',
  METHOD_NOT_ALLOWED = 'The method specified in the Request-Line is not allowed for the resource identified by the Request-URI',
  NOT_ACCEPTABLE = 'The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request',
  PROXY_AUTHENTICATION_REQUIRED = 'This code is similar to 401 (Unauthorized), but indicates that the client must first authenticate itself with the proxy',
  REQUEST_TIMEOUT = 'The client did not produce a request within the time that the server was prepared to wait',
  CONFLICT = 'The request could not be completed due to a conflict with the current state of the resource',
  GONE = 'The requested resource is no longer available at the server and no forwarding address is known',
  LENGTH_REQUIRED = 'The server refuses to accept the request without a defined Content- Length',
  PRECONDITION_FAILED = 'The precondition given in one or more of the request-header fields evaluated to false when it was tested on the server',
  PAYLOAD_TOO_LARGE = 'The server is refusing to process a request because the request entity is larger than the server is willing or able to process',
  URI_TOO_LONG = 'The server is refusing to service the request because the Request-URI is longer than the server is willing to interpret',
  UNSUPPORTED_MEDIA_TYPE = 'The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method',

  REQUESTED_RANGE_NOT_SATISFIABLE = 'A server SHOULD return a response with this status code if a request included a Range request-header field (section 14.35), and none of the range-specifier values in this field overlap the current extent of the selected resource, and the request did not include an If-Range request-header field',
  EXPECTATION_FAILED = 'The expectation given in an Expect request-header field could not be met by this server, or, if the server is a proxy, the server has unambiguous evidence that the request could not be met by the next-hop server',

  I_AM_A_TEAPOT = "This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol, and is not expected to be implemented by actual HTTP servers",
  UNPROCESSABLE_ENTITY = 'The 422 (Unprocessable Entity) status code means the server understands the content type of the request entity (hence a 415(Unsupported Media Type) status code is inappropriate), and the syntax of the request entity is correct (thus a 400 (Bad Request) status code is inappropriate) but was unable to process the contained instructions',
  FAILED_DEPENDENCY = 'The 424 (Failed Dependency) status code means that the method could not be performed on the resource because the requested action depended on another action and that action failed',
  TOO_MANY_REQUESTS = 'The 429 status code indicates that the user has sent too many requests in a given amount of time ("rate limiting")',

  INTERNAL_SERVER_ERROR = 'The server encountered an unexpected condition which prevented it from fulfilling the request',

  NOT_IMPLEMENTED = 'The server does not support the functionality required to fulfill the request',
  BAD_GATEWAY = 'The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request',

  SERVICE_UNAVAILABLE = 'The server is currently unable to handle the request due to a temporary overloading or maintenance of the server',
  GATEWAY_TIMEOUT = 'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI (e.g. HTTP, FTP, LDAP) or some other auxiliary server (e.g. DNS) it needed to access in attempting to complete the request',
  HTTP_VERSION_NOT_SUPPORTED = 'The server does not support, or refuses to support, the HTTP protocol version that was used in the request message',
}
