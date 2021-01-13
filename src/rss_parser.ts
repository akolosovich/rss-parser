export class RssParser {
  xmlParser: any;
  selectors: any;

  constructor(xmlParser: any, selectors: any) {
    this.xmlParser = xmlParser;
    this.selectors = selectors;
  }

  parseString(data: any) {
    const options = {
      ignoreAttributes: false,
    };
    const content = this.xmlParser.parse(data, options);

    const root = content.rss || content.feed;
    const version = root['@_version'];
    const channel = root.channel || root;

    return {
      version,
      ...this.selectors.getChannel(channel),
      items: this.selectors.getItems(channel),
    };
  }
}
