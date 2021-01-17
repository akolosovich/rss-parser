import { 
    MediaCredit, 
    MediaTextData, 
    MediaCopyright, 
    MediaThumbnail, 
    MediaCategory,
    MediaContent,
    Media,
} from "../dtos";
import { 
    createStructuredSelector, 
    flow, 
    get, 
    map, 
    filter, 
    isArray, 
    isString
} from "../helpers";
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
} from "./props_selectors";

export const selectMediaTitle = createStructuredSelector<MediaTextData>({
    value: getPropText,
    type: getPropType,
});

export const getMediaTitle = flow<MediaTextData>(
    get('media:title'),
    (data: any) => data ? selectMediaTitle(data) : null,
);

export const selectMediaDescription = createStructuredSelector<MediaTextData>({
    value: getPropText,
    type: getPropType,
});

export const getMediaDescription = flow<MediaTextData>(
    get('media:description'),
    (data: any) => data ? selectMediaDescription(data) : null,
);

export const selectMediaThumbnail = createStructuredSelector<MediaThumbnail>({
    url: getPropUrl,
    width: getPropWidth,
    height: getPropHeight,
    time: getPropTime,
});

export const getMediaThumbnail = flow<MediaThumbnail>(
    get('media:thumbnail'),
    (data: any) => data ? selectMediaThumbnail(data) : null,
);

export const selectCredit = createStructuredSelector<MediaCredit>({
    value: getPropText,
    role: getPropRole,
    scheme: getPropScheme,
});

export const getCredit = flow<MediaCredit>(
    get('media:credit'),
    (data: any) => data ? selectCredit(data) : null,
);

export const selectCopyright = createStructuredSelector<MediaCopyright>({
    url: getPropUrl,
});

export const getCopyright = (data: any) => data 
    ? selectCopyright(data) 
    : null;

export const selectCategory = createStructuredSelector<MediaCategory>({
    value: getPropText,
    scheme: getPropScheme,
    label: getPropLabel,
});

export const getCategories = flow<MediaCategory[]>(
    get('media:category'),
    (data: any) => isArray(data) ? data : [data],
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
    filter((element: any) => element),
);

export const selectMediaContent = createStructuredSelector<MediaContent>({
    title: getMediaTitle,
    description: getMediaDescription,
    thumbnail: getMediaThumbnail,
    categories: getCategories,
    credit: getCredit,
    copyright: getCopyright,
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

export const getMediaContent = flow<MediaContent>(
    get('media:content'),
    (data: any) => data ? selectMediaContent(data) : null,
);

export const getMedia = (obj: any): Media => {
    if (!obj) {
        return null;
    }

    const content = getMediaContent(obj);
    const categories = getCategories(obj);

    if (!content && !categories.length) {
        return null;
    }

    return { categories, content };
};
