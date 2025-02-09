import { MaxLength, MinLength } from 'class-validator';

export class CreateCardDto {
  @MinLength(3, {
    message: 'Title must have at least 3 characters',
  })
  @MaxLength(63, {
    message: 'Title must have at most 63 characters',
  })
  question: string;

  @MinLength(10, {
    message: 'Title must have at least 10 characters',
  })
  @MaxLength(255, {
    message: 'Title must have at most 255 characters',
  })
  answer: string;
}
