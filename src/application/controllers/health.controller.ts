/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';
/**
 * Health controller class
 */
@Controller('health')
export class HealthController {
  /**
   * Health check controller class constructor.
   * @param health health check service
   * @param http http response
   */
  constructor(private health: HealthCheckService, private http: HttpHealthIndicator) {}
  //======================================================================================================
  /**
   * Checks the liveness of the project
   * @returns http response
   */
  @Get()
  @HealthCheck()
  check() {
    return { status: 'ok', info: { alive: { status: 'up' } }, error: {}, details: { alive: { status: 'up' } } };
  }
}
