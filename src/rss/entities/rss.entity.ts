export class RssItem {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly itunesImage: string,
    public readonly mediaContentAudio: string,
    public readonly mediaPlayer: string,
    public readonly mediaContentImage: string,
  ) {}
}
