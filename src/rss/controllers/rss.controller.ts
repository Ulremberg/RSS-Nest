import { Controller, Get, Param, Query } from '@nestjs/common';
import { RssUseCase } from '../usecase/rss.usecase';
import { RssItem } from '../entities/rss.entity';

@Controller('rss')
export class RssController {
  constructor(private readonly rssUseCase: RssUseCase) {}

  @Get('search')
  async searchByQuery(
    @Query('phrase') phrase: string,
  ): Promise<RssItem[] | null> {
    return this.rssUseCase.searchInRss(phrase);
  }

  @Get('search/:phrase')
  async searchByParam(
    @Param('phrase') phrase: string,
  ): Promise<RssItem[] | null> {
    return this.rssUseCase.searchInRss(phrase);
  }
}
