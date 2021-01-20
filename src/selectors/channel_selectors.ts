import { Channel, Image, Person, Nullable } from '../dtos';
import { createSelector, createStructuredSelector, flow, get, getOrNull, isString, trimOrNull } from '../helpers';
import { getEntries } from './entry_selectors';
import {
  getLinks,
  getCategories,
  getPublishedOn,
  getPerson,
  getUpdatedOn,
  getGuid,
  getAuthors,
  getContributors,
} from './common_selectors';
import { getPropVersion } from './props_selectors';

export const getTitle = flow<string>(get('title'), (title: any) => {
  if (!title) {
    return null;
  }

  return isString(title) ? title : null;
});

export const getDescription = createSelector<Nullable<string>>(
  get('description'),
  get('subtitle'),
  (description: any, subtitle: any) => {
    const value = description || subtitle;

    if (!value) {
      return null;
    }

    if (isString(value)) {
      return value;
    }

    return value.toString();
  }
);

const getLanguage = flow<string>(get('language'), trimOrNull);

const getManagingEditor = flow<Person>(get('managingEditor'), getPerson);

const getWebMaster = flow<Person>(get('webMaster'), getPerson);

const selectImage = createStructuredSelector<Image>({
  url: getOrNull('url'),
  title: getOrNull('title'),
  link: getOrNull('link'),
  description: getOrNull('description'),
  height: getOrNull('height'),
  width: getOrNull('width'),
});

const getImage = flow<Image>(get('image'), (data: any) => (data ? selectImage(data) : null));

export const getChannel = (content: any): Channel => {
  const root = content.rss || content.feed;
  const channel = root.channel || root;

  return {
    id: getGuid(channel),
    title: getTitle(channel),
    version: getPropVersion(root),
    description: getDescription(channel),
    language: getLanguage(channel),
    links: getLinks(channel),
    image: getImage(channel),
    managingEditor: getManagingEditor(channel),
    webMaster: getWebMaster(channel),
    authors: getAuthors(channel),
    contributors: getContributors(channel),
    updatedOn: getUpdatedOn(channel),
    publishedOn: getPublishedOn(channel),
    categories: getCategories(channel),
    entries: getEntries(channel),
  };
};
