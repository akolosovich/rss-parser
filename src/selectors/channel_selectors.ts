import { Channel, Fun, Image } from '../dtos';
import { createStructuredSelector, flow, get, getOrNull, trimOrNull } from '../helpers';
import { getItems } from './channel_item_selectors';
import {
  getTitle,
  getDescription,
  getLinks,
  getCategories,
  getPublishedOn,
  getPropVersion,
} from './common_selectors';

const getLanguage = flow(
  get('language'),
  trimOrNull,
);

const getManagingEditor = flow(
  get('managingEditor'),
  trimOrNull,
);

const getWebMaster = flow(
  get('webMaster'),
  trimOrNull,
);

const getLastBuildDate = flow(
  get('lastBuildDate'),
  trimOrNull,
);

const selectImage = createStructuredSelector({
  link: getOrNull('link'),
  url: getOrNull('url'),
  title: getOrNull('title'),
  height: getOrNull('height'),
  width: getOrNull('width'),
});

const getImage: Fun<Image> = flow(
  get('image'),
  (data: any) => data ? selectImage(data): null,
);

export const getChannel = (content: any): Channel => {
  const root = content.rss || content.feed;
  const channel = root.channel || root;

  return {
    version: getPropVersion(root),
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
