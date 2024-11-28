import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { HealthController } from '../src/health/health.controller';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  // Se ejecuta una vez antes de todas las pruebas
  beforeAll(async () => {
    // generamos el escenario para los test
    const moduleFixture = await Test.createTestingModule({
      controllers: [HealthController], // Incluye el controlador a probar
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init(); // Inicializa la aplicación
  });

  afterAll(async () => {
    await app.close(); // Cierra la aplicación después de las pruebas
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health') // Ruta que queremos probar
      .expect(200) // Esperamos un código de estado 200
      .expect('ok'); // Esperamos que el cuerpo de la respuesta sea "ok"
  });
});
