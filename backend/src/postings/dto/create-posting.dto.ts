import { IsString, IsOptional, IsEnum, IsArray, IsNumber, isEnum } from "class-validator";
import { PostingStatus } from "../../enums/posting-status.enum";

export class CreatePostingDto {
  @IsNumber()
  categoryId: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  // @IsEnum(['draft', 'publish'])
  // status: 'draft' | 'publish';

  @IsEnum(PostingStatus)
  status: PostingStatus

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[] | string;
}
