import { Channel, Image, Person, Generator, Nullable } from '../dtos';
import {
  createSelector,
  createStructuredSelector,
  flow,
  get,
  getOrNull,
  isString,
  toInteger,
  trimOrNull,
} from '../helpers';
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
import { getPropText, getPropUri, getPropVersion } from './props_selectors';
import { getDublinCore } from './dublin_core_selectors';

const getTitle = flow<string>(get('title'), (title: any) => {
  if (!title) {
    return null;
  }

  return isString(title) ? title : null;
});

const getDescription = createSelector<Nullable<string>>(
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

const getTtl = flow<number>(get('ttl'), toInteger);

const getImage = flow<Image>(get('image'), (data: any) => (data ? selectImage(data) : null));

const selectImage = createStructuredSelector<Image>({
  url: getOrNull('url'),
  title: getOrNull('title'),
  link: getOrNull('link'),
  description: getOrNull('description'),
  height: flow(get('height'), toInteger),
  width: flow(get('width'), toInteger),
});

const selectGenerator = createStructuredSelector<Generator>({
  value: getPropText,
  version: getPropVersion,
  uri: getPropUri,
});

const getGenerator = flow<Generator>(get('generator'), (generator: any) => {
  if (!generator) {
    return null;
  }

  const value = isString(generator) ? { '#text': generator } : generator;

  return selectGenerator(value);
});

const getString = (obj: any) => {
  if (!obj) {
    return null;
  }

  if (isString(obj)) {
    return obj;
  }

  return null;
};

const getIcon = flow<Nullable<string>>(get('icon'), getString);

const getLogo = flow<Nullable<string>>(get('logo'), getString);

const selectChannel = createStructuredSelector<Channel>({
  id: getGuid,
  title: getTitle,
  version: getPropVersion,
  description: getDescription,
  language: getLanguage,
  links: getLinks,
  image: getImage,
  managingEditor: getManagingEditor,
  webMaster: getWebMaster,
  authors: getAuthors,
  contributors: getContributors,
  updatedOn: getUpdatedOn,
  publishedOn: getPublishedOn,
  categories: getCategories,
  entries: getEntries,
  generator: getGenerator,
  ttl: getTtl,
  icon: getIcon,
  logo: getLogo,
  dc: getDublinCore,
});

export const getChannel = (content: any): Channel => {
  if (!content) {
    return null;
  }

  const root = content.rss || content.feed || content['rdf:RDF'];

  if (!root) {
    return null;
  }

  const channel = root.channel || root;

  if (root.channel) {
    const otherKeys = Object.keys(root).filter(key => key !== 'channel');

    if (otherKeys.length) {
      // RSS 1.0
      otherKeys.forEach(key => (channel[key] = root[key]));
    }
  }

  return selectChannel(channel);
};
