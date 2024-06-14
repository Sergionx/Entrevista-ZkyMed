import { Test, TestingModule } from '@nestjs/testing';
import { DeckController } from './deck.controller';
import { DeckService } from '../services/deck.service';
import { CreateDeckDto } from '../dto/create-deck.dto';

describe('DeckController', () => {
  let controller: DeckController;

  const mockDeckService = {
    findAll: jest.fn(() => [
      {
        id: '',
        title: 'Deck 1',
        description: 'Description, Deck 1',
        cards: [],
      },
    ]),
    findOne: jest.fn(() => ({
      id: '',
      title: 'Deck 1',
      description: 'Description, Deck 1',
      cards: [],
    })),
    create: jest.fn((dto) => ({ id: '', ...dto })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    delete: jest.fn((id) => ({
      id,
      title: 'Deck 1',
      description: 'Description, Deck 1',
      cards: [],
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeckController],
      providers: [DeckService],
    })
      .overrideProvider(DeckService)
      .useValue(mockDeckService)
      .compile();

    controller = module.get<DeckController>(DeckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all decks', async () => {
    const result = [
      {
        id: '',
        title: 'Deck 1',
        description: 'Description, Deck 1',
        cards: [],
      },
    ];

    expect(await controller.getAll()).toEqual(result);
    expect(mockDeckService.findAll).toHaveBeenCalled();
  });

  it('should get one card', async () => {
    const deckDTO: CreateDeckDto = {
      title: 'Deck 1',
      description: 'Description, Deck 1',
      cards: [],
    };
    expect(await controller.getOne('1')).toEqual({
      id: expect.any(String),
      ...deckDTO,
    });

    expect(mockDeckService.findOne).toHaveBeenCalledWith('1');
  });

  it('should create a deck', async () => {
    const deckDTO: CreateDeckDto = {
      title: 'Deck 1',
      description: 'Description, Deck 1',
      cards: [],
    };

    expect(await controller.create(deckDTO)).toEqual({
      id: expect.any(String),
      title: 'Deck 1',
      description: 'Description, Deck 1',
      cards: [],
    });

    expect(mockDeckService.create).toHaveBeenCalledWith(deckDTO);
  });

  it('should update a deck', async () => {
    const deckDTO: CreateDeckDto = {
      title: 'Updated Deck 1',
      description: 'Description, Deck 1',
      cards: [],
    };

    const deckId = '1';

    expect(await controller.update(deckId, deckDTO)).toEqual({
      id: expect.any(String),
      title: 'Updated Deck 1',
      description: 'Description, Deck 1',
      cards: [],
    });

    expect(mockDeckService.update).toHaveBeenCalledWith(deckId, deckDTO);
  });

  it('should delete a card', async () => {
    expect(await controller.delete('1')).toEqual({
      id: '1',
      title: 'Deck 1',
      description: 'Description, Deck 1',
      cards: [],
    });

    expect(mockDeckService.delete).toHaveBeenCalledWith('1');
  });
});
