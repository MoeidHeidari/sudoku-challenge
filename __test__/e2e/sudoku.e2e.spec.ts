import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/infrastructure/modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import supertest from 'supertest';
import { TEST_GRID_1, TEST_GRID_2, TEST_GRID_3, TEST_GRID_4, TEST_GRID_5, TEST_GRID_6 } from '../fcatory';
describe('GRID endpoints (e2e)', () => {
  let app: INestApplication;
  let request: ReturnType<typeof supertest>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const config = new DocumentBuilder()
      .setTitle('Sudoku solver service')
      .setDescription('A service to solve a 9x9 sudoku grid')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    request = supertest(app.getHttpServer());
  });
  //=============================================================================================================================
  describe('check service liveness', () => {
    it('should receive status code 404', async () => {
      return await request.get('/').expect(404);
    });
  });

  describe('check Sudoko endpoints', () => {
    it('should receive status code 200', async () => {
      return await request.get('/api/v1/sudoku').expect(200).expect('Welcome to Sudoko solver endpoint');
    });
    it('should return 400 bad request error', async () => {
      return await request.post('/api/v1/sudoku').send({ grid: '' }).expect(400);
    });
    it('should return 400 bad request error', async () => {
      return await request.post('/api/v1/sudoku').send().expect(400);
    });

    it('should return 200 Success request', async () => {
      return await request.post('/api/v1/sudoku').send({ grid: TEST_GRID_1 }).expect(200);
    });
    it('should return 200 Success request', async () => {
      return await request.post('/api/v1/sudoku').send({ grid: TEST_GRID_2 }).expect(200);
    });
    it('should return 200 Success request', async () => {
      return await request.post('/api/v1/sudoku').send({ grid: TEST_GRID_3 }).expect(200);
    });

    it('should return 200 Success request', async () => {
      return await request.post('/api/v1/sudoku').send({ grid: TEST_GRID_5 }).expect(200);
    });
    it('should return 200 Success request', async () => {
      return await request.post('/api/v1/sudoku').send({ grid: TEST_GRID_6 }).expect(200);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
