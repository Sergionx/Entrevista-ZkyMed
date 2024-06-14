import { Test, TestingModule } from '@nestjs/testing';
import { CardController } from './card.controller';
import { CardService } from '../services/card.service';
import { CreateCardDto } from '../dto/create-card.dto';

describe('CardController', () => {
  let controller: CardController;

  const mockCardService = {
    findAll: jest.fn().mockResolvedValue([
      {
        id: '1',
        question: 'Hello?',
        answer: "It's me, Hello!",
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: '1',
      question: 'Hello?',
      answer: "It's me, Hello!",
    }),
    create: jest.fn((dto) => ({
      id: '',
      ...dto,
    })),
    update: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),
    delete: jest.fn((id) => ({
      id,
      question: 'Hello?',
      answer: "It's me, Hello!",
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardController],
      providers: [CardService],
    })
      .overrideProvider(CardService)
      .useValue(mockCardService)
      .compile();

    controller = module.get<CardController>(CardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all cards', async () => {
    const result = [
      {
        id: '1',
        question: 'Hello?',
        answer: "It's me, Hello!",
      },
    ];
    expect(await controller.getAll()).toEqual(result);

    expect(mockCardService.findAll).toHaveBeenCalled();
  });

  it('should get one card', async () => {
    expect(await controller.getOne('1')).toEqual({
      id: expect.any(String),
      question: 'Hello?',
      answer: "It's me, Hello!",
    });

    expect(mockCardService.findOne).toHaveBeenCalledWith('1');
  });

  it('should create a card', async () => {
    const cardDTO: CreateCardDto = {
      question: 'Hello?',
      answer: "It's me, Hello!",
    };
    expect(await controller.create(cardDTO)).toEqual({
      id: expect.any(String),
      ...cardDTO,
    });
    expect(mockCardService.create).toHaveBeenCalledWith(cardDTO);
  });

  it('should update a card', async () => {
    const cardDTO: CreateCardDto = {
      question: 'Hello?',
      answer: "It's me, Hello!",
    };
    expect(await controller.update('1', cardDTO)).toEqual({
      id: expect.any(String),
      ...cardDTO,
    });

    expect(mockCardService.update).toHaveBeenCalledWith('1', cardDTO);
  });

  it('should delete a card', async () => {
    expect(await controller.delete('1')).toEqual({
      id: expect.any(String),
      question: 'Hello?',
      answer: "It's me, Hello!",
    });

    expect(mockCardService.delete).toHaveBeenCalledWith('1');
  });
});
