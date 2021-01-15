import { Nullable, Link, Fun } from '../dtos';
import {
  isString,
  isArray,
  flow,
  get,
  trimOrNull,
  getOrNull,
  toInteger,
  toBoolean,
  createSelector,
} from '../helpers';

export const getPropVersion: Fun<string> = get('@_version');
export const getPropTerm = get('@_term');
export const getPropUrl: Fun<string> = get('@_url');
export const getPropType: Fun<string> = get('@_type');
export const getPropRole: Fun<string> = get('@_role');
export const getPropScheme: Fun<string> = get('@_scheme');
export const getPropLength: Fun<number> = flow(
  get('@_length'),
  toInteger,
);
export const getPropHref: Fun<string> = get('@_href');
export const getPropRel: Fun<string> = get('@_rel');
export const getPropText: Fun<string> = flow(
  get('#text'),
  trimOrNull,
);
export const getPropFileSize: Fun<number> = flow(
  get('@_fileSize'),
  toInteger,
);
export const getPropMedium: Fun<string> = get('@_medium');
export const getPropIsDefault: Fun<boolean> = flow(
  get('@_isDefault'),
  toBoolean,
);
export const getPropExpression: Fun<string> = get('@_expression');
export const getPropBitrate: Fun<number> = flow(
  get('@_bitrate'),
  toInteger,
);
export const getPropFramerate: Fun<number> = flow(
  get('@_framerate'),
  toInteger,
);
export const getPropSamplingrate: Fun<number> = flow(
  get('@_samplingrate'),
  toInteger,
);
export const getPropChannels: Fun<number> = flow(
  get('@_channels'),
  toInteger,
);
export const getPropDuration: Fun<number> = flow(
  get('@_duration'),
  toInteger,
);
export const getPropHeight: Fun<number> = flow(
  get('@_height'),
  toInteger,
);
export const getPropWidth: Fun<number> = flow(
  get('@_width'),
  toInteger,
);
export const getPropTime: Fun<string> = get('@_time');
export const getPropLang: Fun<string> = get('@_lang');
export const getPropLabel: Fun<string> = get('@_label');
export const getPropIsPermaLink: Fun<boolean> = flow(
  get('@_isPermaLink'),
  toBoolean,
);

export const getTitle: Fun<string> = flow(
  get('title'),
  trimOrNull,
);
export const getDescription: Fun<string> = createSelector(
  get('description'),
  get('subtitle'),
  (a: any, b: any) => trimOrNull(a || b),
);

export const getLinks = (obj: any): Link[] => {
  if (!obj || !obj.link) {
    return [];
  }
  const link = obj.link;

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
      rel: getPropRel(x),
      url: getPropHref(x),
    }));
  }

  return [];
};

export const getCategory = (obj: any): Nullable<string> => {
  if (!obj) {
    return null;
  }

  if (typeof obj === 'string') {
    return obj;
  }
  
  return getPropTerm(obj) || null;
};

export const getCategories = (obj: any): Nullable<string>[] => {
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

export const getPublishedOn = getOrNull('pubDate');
