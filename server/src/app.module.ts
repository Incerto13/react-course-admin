import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { CourseModule } from './course/course.module';
import { configs, ormConfig, ormConfigFactory } from '../ormconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This allows ConfigService to be used globally
    }),
    TypeOrmModule.forRootAsync(ormConfig),
    AuthorModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
