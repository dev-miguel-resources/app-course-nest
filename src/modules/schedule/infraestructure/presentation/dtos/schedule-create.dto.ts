import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';

import { Prices } from '../../../domain/entities/prices';
import {
  FREQUENCY,
  STATUS_SCHEDULE,
  TYPE_COURSE,
} from '../../../domain/roots/schedule';

export class ScheduleCreateDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TYPE_COURSE)
  type: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  summary: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  slogan: string;

  @IsNotEmpty()
  @IsObject()
  prices: Prices;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dateStart: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  hourStart: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  hourEnd: Date;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  duration: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  sessionsTotal: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(FREQUENCY)
  frequency: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  courseId: string;

  @IsOptional()
  @IsString()
  @IsEnum(FREQUENCY)
  status: STATUS_SCHEDULE;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  whatLearn: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  requirements: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  content: string[];
}
