import { Nullable } from '../dtos';
import { DublinCore } from '../dtos/dc';
import { createStructuredSelector, flow, get, hasKeyStartsWith, isArray, isString, toDate } from '../helpers';

const getNullableString = (key: string) => (data: any): Nullable<string> => {
  if (!data) {
    return null;
  }

  return data[key] || null;
};

const getArrayOfStrings = (key: string) => (data: any): string[] => {
  if (!data) {
    return [];
  }

  const value = data[key];

  const values = isArray(value) ? value : [value];

  return values.filter(isString);
};

const getDublinCoreDate = flow<Date>(get('dc:date'), toDate);

const hasDublinCore = hasKeyStartsWith('dc:');

export const selectDublicCore = createStructuredSelector<DublinCore>({
  id: getNullableString('dc:identifier'),
  title: getNullableString('dc:title'),
  creators: getArrayOfStrings('dc:creator'),
  subject: getNullableString('dc:subject'),
  description: getNullableString('dc:description'),
  publishers: getArrayOfStrings('dc:publisher'),
  contributors: getArrayOfStrings('dc:contributor'),
  date: getDublinCoreDate,
  type: getNullableString('dc:type'),
  format: getNullableString('dc:format'),
  sources: getArrayOfStrings('dc:source'),
  language: getNullableString('dc:language'),
  relation: getNullableString('dc:relation'),
  coverage: getNullableString('dc:coverage'),
  rights: getNullableString('dc:rights'),
});

export const getDublinCore = (obj: any): DublinCore => {
  if (!obj || !hasDublinCore(obj)) {
    return null;
  }

  return selectDublicCore(obj);
};
