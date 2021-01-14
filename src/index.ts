import xmlParser from 'fast-xml-parser';

import { getChannel } from './selectors/channel_selectors';
import { RssParser } from './rss_parser';

export const rssParser = new RssParser(xmlParser, { getChannel });
