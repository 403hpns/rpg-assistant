import { IsOptional, IsPositive, MinLength } from 'class-validator';

export class CreateCharacterDto {
  @MinLength(1)
  firstName: string;

  @IsOptional()
  @MinLength(1)
  middleName: string;

  @MinLength(1)
  lastName: string;

  @MinLength(1)
  race: string;

  @MinLength(1)
  currentProffesion: string;

  @IsOptional()
  previousProffesion: string;

  @MinLength(1)
  sex: string;

  @IsPositive()
  age: number;

  @IsPositive()
  weight: number;

  @IsPositive()
  height: number;

  @IsOptional()
  eyeColor: string;

  @IsOptional()
  starSign: string;

  @IsOptional()
  placeOfBirth: string;

  @IsOptional()
  @IsPositive()
  siblings: number;

  @IsOptional()
  description: string;
}
