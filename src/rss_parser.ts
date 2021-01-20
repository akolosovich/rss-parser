import { Channel } from './dtos';

export class RssParser {
  private xmlParser: any;
  private selectors: any;

  constructor(xmlParser: any, selectors: any) {
    this.xmlParser = xmlParser;
    this.selectors = selectors;
  }

  parseString(xml: string): Channel {
    const options = {
      ignoreAttributes: false,
    };
    const content = this.xmlParser.parse(xml, options);

    return this.selectors.getChannel(content);
  }
}
