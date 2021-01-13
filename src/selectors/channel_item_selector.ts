import { ChannelItem, Enclosure, Guid, Num, Str, Source } from '../dtos';
import { isArray, isString } from '../helpers';
import {
  getPropText,
  getPropUrl,
  getPropType,
  getPropLength,
  getTitle,
  getDescription,
  getLinks,
  getCategories,
  getPublishedOn,
  trimOrNull,
} from './common_selectors';

const getIsPermaLink = (obj: any): boolean => {
  if (!obj) {
    return false;
  }

  return !!obj['@_isPermaLink'];
};

const getGuid = (obj: any): Guid => {
  if (!obj || !obj.guid) {
    return null;
  }
  const { guid } = obj;

  if (isString(guid)) {
    return { isPermaLink: false, value: guid };
  }

  return {
    value: getPropText(guid),
    isPermaLink: getIsPermaLink(guid),
  };
};

const getLength = (obj: any): Num => {
  if (!obj) {
    return null;
  }
  const value = Number(getPropLength(obj));

  if (Number.isNaN(value)) {
    return null;
  }

  return value;
};

const getEnclosure = (obj: any): Enclosure => {
  if (!obj || !obj.enclosure) {
    return null;
  }
  const { enclosure } = obj;

  if (isArray(enclosure)) {
    console.log('Incorrect type [enclosure]');

    return null;
  }

  return {
    url: getPropUrl(enclosure),
    type: getPropType(enclosure),
    length: getLength(enclosure),
  };
};

const getContent = (obj: any): Str => {
  if (!obj) {
    return null;
  }

  return trimOrNull(obj['content:encoded']);
};

const getSource = (obj: any): Source => {
  if (!obj || !obj.source) {
    return null;
  }

  const { source } = obj;

  if (isArray(source)) {
    console.log('Incorrect type [source]');

    return null;
  }

  return {
    title: getPropText(source),
    url: getPropUrl(source),
  };
};

const getItem = (obj: any): ChannelItem => ({
  title: getTitle(obj),
  description: getDescription(obj),
  content: getContent(obj),
  links: getLinks(obj),
  guid: getGuid(obj),
  categories: getCategories(obj),
  enclosure: getEnclosure(obj),
  publishedOn: getPublishedOn(obj),
  source: getSource(obj),
});

export const getItems = (obj: any): ChannelItem[] => {
  if (!obj) {
    return [];
  }

  const items = obj.entry || obj.item;

  if (!items) {
    return [];
  }

  if (!isArray(items)) {
    return [getItem(items)];
  }

  return items.map(getItem);
};
