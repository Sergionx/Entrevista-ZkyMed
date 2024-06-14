import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from './card.service';
import { Card } from '../models/card.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CardService', () => {
  let service: CardService;

  const mockCardRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardService,
        {
          provide: getRepositoryToken(Card),
          useValue: mockCardRepository,
        },
      ],
    }).compile();

    service = module.get<CardService>(CardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
