import { ChannelItem, Enclosure, Guid, Source, Fun } from '../dtos';
import { createStructuredSelector, flow, get, isArray, isString, trimOrNull } from '../helpers';
import {
  getPropText,
  getPropUrl,
  getPropType,
  getPropLength,
  getPropIsPermaLink,
  getTitle,
  getDescription,
  getLinks,
  getCategories,
  getPublishedOn,
} from './common_selectors';
import { getMedia } from './media_selectors';

export const selectGuid = createStructuredSelector({
  value: getPropText,
  isPermaLink: getPropIsPermaLink,
});

export const getGuid: Fun<Guid> = flow(
  get('guid'),
  (guid: any) => {
    if (isString(guid)) {
      return {
        value: guid,
        isPermaLink: false,
      };
    }

    return guid ? selectGuid(guid) : null;
  },
);

export const selectEnclosure: Fun<Enclosure> = createStructuredSelector({
  url: getPropUrl,
  type: getPropType,
  length: getPropLength,
});

export const getEnclosure: Fun<Enclosure> = flow(
  get('enclosure'),
  (data: any) => data ? selectEnclosure(data) : null,
);

export const getContent: Fun<string> = flow(
  get('content:encoded'),
  trimOrNull,
);

export const selectSource = createStructuredSelector({
  title: getPropText,
  url: getPropUrl,
});

export const getSource: Fun<Source> = flow(
  get('source'),
  (data: any) => data ? selectSource(data) : null,
);

export const getItem: Fun<ChannelItem> = createStructuredSelector({
  title: getTitle,
  description: getDescription,
  content: getContent,
  links: getLinks,
  guid: getGuid,
  categories: getCategories,
  enclosure: getEnclosure,
  publishedOn: getPublishedOn,
  source: getSource,
  media: getMedia,
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
