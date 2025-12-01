import { IsString, IsOptional, IsEnum, IsArray, IsNumber, isEnum } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  name: string;
}
