import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostingsModule } from './postings/postings.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',     // ubah sesuai MySQL kamu
      password: '',         // ubah sesuai MySQL kamu
      database: 'portal',   // ubah sesuai database kamu
      synchronize: true,    // development only
      autoLoadEntities: true,
    }),
    CategoriesModule,
    PostingsModule,
    TagsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
