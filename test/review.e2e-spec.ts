import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/auth/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
  name: 'Тест',
  title: 'Заголовок',
  description: 'Описание тестовое',
  rating: 5,
  productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201);
    createdId = response.body._id;
    expect(createdId).toBeDefined();
  });

  it('/review/byProduct/:productId (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/review/byProduct' + productId)
      .expect(200);

    expect(response.body.length).toBe(1);
  });

  it('/review/:id (DELETE)', () => {
    const response = request(app.getHttpServer())
      .delete('/review' + createdId)
      .expect(200);
  });
});

afterAll(() => {
  disconnect();
});
