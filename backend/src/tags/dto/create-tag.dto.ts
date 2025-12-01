import { IsString, IsOptional, IsEnum, IsArray, IsNumber, isEnum } from "class-validator";

export class CreateTagDto {
  @IsString()
  name: string;
}
