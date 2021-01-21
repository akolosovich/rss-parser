import {
  MediaCredit,
  MediaTextData,
  MediaCopyright,
  MediaThumbnail,
  MediaCategory,
  MediaContent,
  Media,
} from '../dtos';
import { createStructuredSelector, flow, get, map, filter, isArray, isString } from '../helpers';
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

export const selectMediaTitle = createStructuredSelector<MediaTextData>({
  value: getPropText,
  type: getPropType,
});

export const getMediaTitle = flow<MediaTextData>(get('media:title'), (data: any) =>
  data ? selectMediaTitle(data) : null
);

export const selectMediaDescription = createStructuredSelector<MediaTextData>({
  value: getPropText,
  type: getPropType,
});

export const getMediaDescription = flow<MediaTextData>(get('media:description'), (data: any) => {
  if (!data) {
    return null;
  }

  const value = isString(data) ? { '#text': data } : data;

  return selectMediaDescription(value);
});

export const selectMediaThumbnail = createStructuredSelector<MediaThumbnail>({
  url: getPropUrl,
  width: getPropWidth,
  height: getPropHeight,
  time: getPropTime,
});

export const getMediaThumbnails = flow<MediaThumbnail[]>(get('media:thumbnail'), (data: any) => {
  if (!data) {
    return [];
  }

  const values = isArray(data) ? data : [data];

  return values.map(selectMediaThumbnail);
});

export const selectCredit = createStructuredSelector<MediaCredit>({
  value: getPropText,
  role: getPropRole,
  scheme: getPropScheme,
});

export const getMediaCredit = flow<MediaCredit>(get('media:credit'), (data: any) => {
  if (!data) {
    return null;
  }
  const value = isString(data) ? { '#text': data } : data;

  return selectCredit(value);
});

export const selectCopyright = createStructuredSelector<MediaCopyright>({
  url: getPropUrl,
});

export const getMediaCopyright = flow<MediaCopyright>(get('media:copyright'), (data: any) =>
  data ? selectCopyright(data) : null
);

export const selectCategory = createStructuredSelector<MediaCategory>({
  value: getPropText,
  scheme: getPropScheme,
  label: getPropLabel,
});

export const getMediaCategories = flow<MediaCategory[]>(
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

export const selectMediaContent = createStructuredSelector<MediaContent>({
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

export const getMediaContents = flow<MediaContent[]>(get('media:content'), (data: any) => {
  if (!data) {
    return [];
  }

  const values = isArray(data) ? data : [data];

  return values.map(selectMediaContent);
});

export const selectMedia = createStructuredSelector<Media>({
  title: getMediaTitle,
  description: getMediaDescription,
  thumbnails: getMediaThumbnails,
  categories: getMediaCategories,
  contents: getMediaContents,
  credit: getMediaCredit,
  copyright: getMediaCopyright,
});

export const hasMedia = (data: any) => Object.keys(data).filter(key => key.startsWith('media:')).length > 0;

export const getMedia = (obj: any): Media => {
  if (!obj) {
    return null;
  }

  if (!hasMedia(obj)) {
    return null;
  }

  return selectMedia(obj);
};
