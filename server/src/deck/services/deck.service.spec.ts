import { Test, TestingModule } from '@nestjs/testing';
import { DeckService } from './deck.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Deck } from '../models/deck.entity';

describe('DeckService', () => {
  let service: DeckService;

  const mockDeckRepository = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeckService,
        {
          provide: getRepositoryToken(Deck),
          useValue: mockDeckRepository,
        },
      ],
    }).compile();

    service = module.get<DeckService>(DeckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
