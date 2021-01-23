import {
  MediaCredit,
  MediaTextData,
  MediaCopyright,
  MediaThumbnail,
  MediaCategory,
  MediaContent,
  Media,
} from '../dtos';
import { createStructuredSelector, flow, get, map, filter, isArray, isString, hasKeyStartsWith } from '../helpers';
import {
  getPropBitrate,
  getPropChannels,
  getPropDuration,
  getPropExpression,
  getPropFileSize,
  getPropFramerate,
  getPropHeight,
  getPropIsDefault,
  getPropLang,
  getPropMedium,
  getPropSamplingrate,
  getPropText,
  getPropType,
  getPropUrl,
  getPropWidth,
  getPropTime,
  getPropRole,
  getPropScheme,
  getPropLabel,
} from './props_selectors';

const selectMediaTitle = createStructuredSelector<MediaTextData>({
  value: getPropText,
  type: getPropType,
});

const getMediaTitle = flow<MediaTextData>(get('media:title'), (data: any) => (data ? selectMediaTitle(data) : null));

const selectMediaDescription = createStructuredSelector<MediaTextData>({
  value: getPropText,
  type: getPropType,
});

const getMediaDescription = flow<MediaTextData>(get('media:description'), (data: any) => {
  if (!data) {
    return null;
  }

  const value = isString(data) ? { '#text': data } : data;

  return selectMediaDescription(value);
});

const selectMediaThumbnail = createStructuredSelector<MediaThumbnail>({
  url: getPropUrl,
  width: getPropWidth,
  height: getPropHeight,
  time: getPropTime,
});

const getMediaThumbnails = flow<MediaThumbnail[]>(get('media:thumbnail'), (data: any) => {
  if (!data) {
    return [];
  }

  const values = isArray(data) ? data : [data];

  return values.map(selectMediaThumbnail);
});

const selectCredit = createStructuredSelector<MediaCredit>({
  value: getPropText,
  role: getPropRole,
  scheme: getPropScheme,
});

const getMediaCredit = flow<MediaCredit>(get('media:credit'), (data: any) => {
  if (!data) {
    return null;
  }
  const value = isString(data) ? { '#text': data } : data;

  return selectCredit(value);
});

const selectCopyright = createStructuredSelector<MediaCopyright>({
  url: getPropUrl,
});

const getMediaCopyright = flow<MediaCopyright>(get('media:copyright'), (data: any) =>
  data ? selectCopyright(data) : null
);

const selectCategory = createStructuredSelector<MediaCategory>({
  value: getPropText,
  scheme: getPropScheme,
  label: getPropLabel,
});

const getMediaCategories = flow<MediaCategory[]>(
  get('media:category'),
  (data: any) => (isArray(data) ? data : [data]),
  map((element: any) => {
    if (!element) {
      return null;
    }

    if (isString(element)) {
      return {
        value: element,
        scheme: null,
        label: null,
      };
    }

    return selectCategory(element);
  }),
  filter((element: any) => element)
);

const selectMediaContent = createStructuredSelector<MediaContent>({
  title: getMediaTitle,
  description: getMediaDescription,
  thumbnails: getMediaThumbnails,
  categories: getMediaCategories,
  credit: getMediaCredit,
  copyright: getMediaCopyright,

  url: getPropUrl,
  fileSize: getPropFileSize,
  type: getPropType,
  medium: getPropMedium,
  isDefault: getPropIsDefault,
  expression: getPropExpression,
  bitrate: getPropBitrate,
  framerate: getPropFramerate,
  samplingrate: getPropSamplingrate,
  channels: getPropChannels,
  duration: getPropDuration,
  height: getPropHeight,
  width: getPropWidth,
  lang: getPropLang,
});

const getMediaContents = flow<MediaContent[]>(get('media:content'), (data: any) => {
  if (!data) {
    return [];
  }

  const values = isArray(data) ? data : [data];

  return values.map(selectMediaContent);
});

const hasMedia = hasKeyStartsWith('media:');

export const selectMedia = createStructuredSelector<Media>({
  title: getMediaTitle,
  description: getMediaDescription,
  thumbnails: getMediaThumbnails,
  categories: getMediaCategories,
  contents: getMediaContents,
  credit: getMediaCredit,
  copyright: getMediaCopyright,
});

export const getMedia = (obj: any): Media => {
  if (!obj) {
    return null;
  }

  if (!hasMedia(obj)) {
    return null;
  }

  return selectMedia(obj);
};
