import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { PostingsService } from "./postings.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreatePostingDto } from "./dto/create-posting.dto";
import { UpdatePostingDto } from "./dto/update-posting.dto";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller('postings')
export class PostingsController {
  constructor(private readonly postingsService: PostingsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/postings',
      filename: (req, file, callback) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, unique + extname(file.originalname));
      },
    }),
  }))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePostingDto
  ) {
    if (file) {
      body.image = file.filename;
    }

    return this.postingsService.create(body, file);
  }

  @Get()
  findAll() {
    return this.postingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postingsService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/postings',
      filename: (req, file, callback) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, unique + extname(file.originalname));
      },
    }),
  }))

  update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdatePostingDto
  ) {
    if (file) body.image = file.filename;
    return this.postingsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postingsService.remove(+id);
  }
}
