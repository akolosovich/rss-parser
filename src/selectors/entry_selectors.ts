import { Enclosure, Source, Entry } from '../dtos';
import { createSelector, createStructuredSelector, flow, get, isArray } from '../helpers';
import {
  getLinks,
  getCategories,
  getPublishedOn,
  getUpdatedOn,
  getText,
  getGuid,
  getRights,
  getAuthors,
  getContributors,
} from './common_selectors';
import { getPropLength, getPropText, getPropType, getPropUrl } from './props_selectors';
import { getMedia } from './media_selectors';

export const getTitle = flow<Text>(get('title'), getText);

export const getDescription = createSelector<Text>(
  get('description'),
  get('summary'),
  (description: any, summary: any) => getText(description || summary)
);

export const selectEnclosure = createStructuredSelector<Enclosure>({
  url: getPropUrl,
  type: getPropType,
  length: getPropLength,
});

export const getEnclosures = flow<Enclosure>(get('enclosure'), (enclosure: any) => {
  if (!enclosure) {
    return [];
  }
  const values = isArray(enclosure) ? enclosure : [enclosure];

  return values.map(selectEnclosure);
});

export const getContent = createSelector<Text>(get('content:encoded'), get('content'), (a: any, b: any) =>
  getText(a || b)
);

export const selectSource = createStructuredSelector<Source>({
  id: getGuid,
  title: createSelector(get('title'), getPropText, (a: any, b: any) => a || b || null),
  url: getPropUrl,
  updatedOn: getUpdatedOn,
});

export const getSource = flow<Source>(get('source'), (data: any) => (data ? selectSource(data) : null));

export const selectEntry = createStructuredSelector<Entry>({
  id: getGuid,
  title: getTitle,
  description: getDescription,
  updatedOn: getUpdatedOn,
  publishedOn: getPublishedOn,
  copyright: getRights,
  links: getLinks,
  categories: getCategories,
  source: getSource,
  enclosures: getEnclosures,
  content: getContent,
  authors: getAuthors,
  contributors: getContributors,
  media: getMedia,
});

export const getEntries = createSelector<Entry[]>(get('item'), get('entry'), (item: any, entry: any): Entry[] => {
  const values = item || entry;

  if (!values) {
    return [];
  }

  const arr = isArray(values) ? values : [values];

  return arr.map(selectEntry).filter((entry: Entry) => entry);
});
