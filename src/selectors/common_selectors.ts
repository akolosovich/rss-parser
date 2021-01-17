import { 
  Link, 
  eLinkRel, 
  Category, 
  eTextType, 
  Text, 
  Person,
  Guid
} from '../dtos';
import {
  isString,
  isArray,
  flow,
  get,
  toDate,
  createStructuredSelector,
  createSelector,
  getOrNull,
  trim,
} from '../helpers';
import {
  getPropDomain,
  getPropHref,
  getPropHreflang,
  getPropIsPermaLink,
  getPropLabel,
  getPropLength,
  getPropRel,
  getPropScheme,
  getPropTerm,
  getPropText, 
  getPropTitle, 
  getPropType,
} from './props_selectors';

export const selectText = createStructuredSelector<Text>({
  value: getPropText,
  type: getPropType,
});

export const getText = (data: any): Text => {
  if (!data) {
    return null;
  }

  if (isString(data)) {
    return {
      value: data.trim(),
      type: eTextType.html,
    };
  }

  return selectText(data);
};

export const selectLink = createStructuredSelector<Link>({
  href: getPropHref,
  rel: getPropRel,
  type: getPropType,
  hreflang: getPropHreflang,
  title: getPropTitle,
  length: getPropLength,
});

export const getLinks = (obj: any): Link[] => {
  if (!obj || !obj.link) {
    return [];
  }
  const link = obj.link;

  if (isString(link)) {
    return [
      selectLink({
        '@_href': link,
        '@_rel': eLinkRel.alternate,
      }),
    ];
  }

  if (isArray(link)) {
    return link.map(selectLink);
  }

  return [selectLink(link)];
};

export const selectCategory = createStructuredSelector<Category>({
  value: (data: any) => getPropText(data) || getPropTerm(data),
  scheme: getPropScheme,
  label: getPropLabel,
  domain: getPropDomain,
});

export const getCategory = (obj: any): Category => {
  if (!obj) {
    return null;
  }

  const category = isString(obj) ? { '@_term': obj } : obj;

  return selectCategory(category);
};

export const getCategories = (obj: any): Category[] => {
  if (!obj || !obj.category) {
    return [];
  }

  const category = obj.category;

  if (isArray(category)) {
    return category.map(getCategory).filter((x: any) => x);
  }

  const cat = getCategory(category);

  if (cat) {
    return [cat];
  }

  return [];
};

export const getPublishedOn = createSelector<Date>(
  get('pubDate'),
  get('published'),
  (a: any, b: any) => toDate(a || b),
);

export const getUpdatedOn = createSelector<Date>(
  get('updated'),
  get('lastBuildDate'),
  (a: any, b: any) => toDate(a || b),
);

export const getRights = createSelector<Text>(
  get('rights'),
  get('copyright'),
  (rights: any, copyright: any) => getText(rights || copyright),
);

export const selectPerson = createStructuredSelector<Person>({
  name: getOrNull('name'),
  email: getOrNull('email'),
  uri: getOrNull('uri'),
});

export const getPerson = (data: any): Person => {
  if (!data) {
    return null;
  }

  if (isString(data)) {
    const values = data.match(/(.+?)\((.+?)\)/);

    if (values && values.length === 3) {
      return {
        name: trim(values[2]),
        email: trim(values[1]),
        uri: null,
      };  
    }

    return {
      name: data,
      email: null,
      uri: null,
    };
  }

  return selectPerson(data);
};

export const getPersons = (data: any): Person[] => {
  if (!data) {
    return [];
  }

  const arr = isArray(data) ? data : [data];

  return arr.map(getPerson).filter((person: any) => person);
};

export const selectGuid = createStructuredSelector<Guid>({
  value: getPropText,
  isPermaLink: getPropIsPermaLink,
});

export const getGuid = createSelector<Guid>(
  get('guid'),
  get('id'),
  (guid: any, id: any) => {
    const value = guid || id;

    if (isString(value)) {
      return {
        value: value,
        isPermaLink: false,
      };
    }

    return value ? selectGuid(value) : null;
  }
);

export const getAuthors = flow<Person[]>(
  get('author'),
  getPersons,
);

export const getContributors = flow<Person[]>(
  get('contributor'),
  getPersons,
);