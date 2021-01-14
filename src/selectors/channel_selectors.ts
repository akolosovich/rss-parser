import { Channel, Str, Image } from '../dtos';
import { getItems } from './channel_item_selector';
import { 
  trimOrNull, 
  getTitle, 
  getDescription, 
  getLinks, 
  getCategories, 
  getPublishedOn
} from './common_selectors';

const getField = (field: string) => (obj: any): Str => {
  if (!obj || !obj[field]) {
    return null;
  }

  return trimOrNull(obj[field]);
};

const getLanguage = getField('language');
const getManagingEditor = getField('managingEditor');
const getWebMaster = getField('webMaster');
const getLastBuildDate = getField('lastBuildDate');
const getImage = (obj: any): Image => {
  if (!obj || !obj.image) {
    return null;
  }

  const { image } = obj;

  return {
    link: trimOrNull(image.link),
    url: trimOrNull(image.url),
    title: trimOrNull(image.title),
  };
};

export const getChannel = (content: any): Channel => {
  const root = content.rss || content.feed;
  const version = root['@_version'];
  const channel = root.channel || root;

  return {
    version,
    title: getTitle(channel),
    description: getDescription(channel),
    language: getLanguage(channel),
    links: getLinks(channel),
    image: getImage(channel),
    managingEditor: getManagingEditor(channel),
    webMaster: getWebMaster(channel),
    publishedOn: getPublishedOn(channel),
    lastBuildOn: getLastBuildDate(channel),
    categories: getCategories(channel),
    items: getItems(channel),
  };
};
