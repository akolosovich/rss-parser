import { Str, Link } from '../dtos';
import { isString, isArray, get, trim, getOrNull } from '../helpers';

export const getPropTerm = get('@_term');
export const getPropUrl = get('@_url');
export const getPropType = get('@_type');
export const getPropLength = get('@_length');
export const getHref = get('@_href');
export const getRel = get('@_rel');
export const getPropText = get('#text');
export const trimOrNull = (str: string) => (str ? trim(str) : null);

export const getTitle = (obj: any): Str => {
  if (!obj) {
    return null;
  }
  const { title } = obj;

  return trimOrNull(title);
};

export const getDescription = (obj: any): Str => {
  const descr = getOrNull('description')(obj);
  const subtitle = getOrNull('subtitle')(obj);
  
  return trimOrNull(descr || subtitle);
};

export const getLinks = (obj: any): null | Link[] => {
  if (!obj || !obj.link) {
    return null;
  }
  const { link } = obj;

  if (isString(link)) {
    return [
      {
        rel: 'alternate',
        url: link,
      },
    ];
  }
  if (isArray(link)) {
    return link.map((x: any) => ({
      rel: getRel(x),
      url: getHref(x),
    }));
  }

  return null;
};

export const getCategory = (obj: any): Str => {
  if (!obj) {
    return null;
  }
  if (typeof obj === 'string') {
    return obj;
  }
  if (getPropTerm(obj)) {
    return getPropTerm(obj);
  }

  return null;
};

export const getCategories = (obj: any): null | Str[] => {
  if (!obj || !obj.category) {
    return null;
  }

  const { category } = obj;

  if (category instanceof Array) {
    return category.map(getCategory).filter(x => x);
  }

  const cat = getCategory(category);

  if (cat) {
    return [cat];
  }

  return null;
};

export const getPublishedOn = getOrNull('pubDate');
