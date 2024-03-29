import { Module } from '@nestjs/common';
import { RssController } from './controllers/rss.controller';
import { RssUseCase } from './usecase/rss.usecase';

@Module({
  controllers: [RssController],
  providers: [RssUseCase],
})
export class RssModule {}
