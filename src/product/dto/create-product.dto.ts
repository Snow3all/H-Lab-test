import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @IsNotEmptyObject({}, { each: true })
  name: { [languageCode: string]: string };

  @IsOptional()
  @IsObject()
  @ValidateNested()
  description: { [languageCode: string]: string };
}
