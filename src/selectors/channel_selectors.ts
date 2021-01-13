import { Channel, Str, Image } from '../dtos';
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

export const getChannel = (data: any): Channel => ({
  title: getTitle(data),
  description: getDescription(data),
  language: getLanguage(data),
  links: getLinks(data),
  image: getImage(data),
  managingEditor: getManagingEditor(data),
  webMaster: getWebMaster(data),
  publishedOn: getPublishedOn(data),
  lastBuildOn: getLastBuildDate(data),
  categories: getCategories(data),
});
