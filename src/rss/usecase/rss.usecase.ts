import { Injectable } from '@nestjs/common';
import { parseString } from 'xml2js';
import { RssItem } from '../entities/rss.entity';
import fetch from 'node-fetch';

@Injectable()
export class RssUseCase {
  async searchInRss(phrase: string): Promise<RssItem[] | null> {
    try {
      const rssUrl = process.env.RSS_URL;

      const response = await fetch(rssUrl);
      const xmlData = await response.text();

      const results: RssItem[] = parseRssItems(xmlData, phrase);
      return results;
    } catch (error) {
      throw new Error(`Erro ao buscar no RSS: ${error.message}`);
    }
  }
}

function parseRssItems(xmlData: string, phrase: string): RssItem[] {
  const results: RssItem[] = [];

  parseString(xmlData, (err, parsedData) => {
    if (err) throw err;

    const items = parsedData.rss.channel[0].item;
    items.forEach((item: RssItem) => {
      const title = item.title[0];
      const description = item.description[0];
      const itunesImage = item['itunes:image'][0]['$'].href;

      const mediaContentAudio = findMediaContentUrl(item, 'audio/mpeg');
      const mediaPlayer = findMediaPlayerUrl(item);
      const mediaContentImage = findMediaContentUrl(item, 'image/jpeg');

      if (title.includes(phrase)) {
        results.push(
          new RssItem(
            title,
            description,
            itunesImage,
            mediaContentAudio,
            mediaPlayer,
            mediaContentImage,
          ),
        );
      }
    });
  });

  return results;
}

function findMediaContentUrl(
  item: RssItem,
  contentType: string,
): string | null {
  const mediaContent = item['media:content'].find(
    (content: any) => content['$'].type === contentType,
  );
  return mediaContent ? mediaContent['$'].url : null;
}

function findMediaPlayerUrl(item: RssItem): string | null {
  const mediaPlayer = item['media:content'][0]['media:player'][0];
  return mediaPlayer ? mediaPlayer['$'].url : null;
}
