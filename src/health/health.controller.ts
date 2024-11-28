import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController() // esto es para que no se documente en swagger
@Controller('health')
export class HealthController {
  @Get()
  health(): string {
    return 'ok';
  }

  /*@ApiExcludeEndpoint() // esto es para un solo método
  @Get()
  health2(): string {
    return 'ok';
  }*/
}
