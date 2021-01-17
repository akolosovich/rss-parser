import { Nullable } from '../dtos';
import {
    flow,
    get,
    toInteger,
    toBoolean,
    isString,
} from '../helpers';

export const getPropAsString = (key: string) => flow<Nullable<string>>(
    get(key),
    (value: any) => {
        if (!value) {
            return null;
        }
        if (isString(value)) {
            return value.trim();
        }
        return value.toString();
    },
);
export const getPropAsNumber = (key: string) => flow<number>(
    get(key),
    toInteger,
);
export const getPropAsBoolean = (key: string) => flow<boolean>(
    get(key),
    toBoolean,
);
export const getPropVersion = getPropAsString('@_version');
export const getPropTerm = getPropAsString('@_term');
export const getPropUrl = getPropAsString('@_url');
export const getPropTitle = getPropAsString('@_title');
export const getPropType = getPropAsString('@_type');
export const getPropRole = getPropAsString('@_role');
export const getPropScheme = getPropAsString('@_scheme');
export const getPropExpression = getPropAsString('@_expression');
export const getPropHref = getPropAsString('@_href');
export const getPropHreflang = getPropAsString('@_hreflang');
export const getPropRel = getPropAsString('@_rel');
export const getPropText = getPropAsString('#text');
export const getPropMedium = getPropAsString('@_medium');
export const getPropTime = getPropAsString('@_time');
export const getPropLang = getPropAsString('@_lang');
export const getPropLabel = getPropAsString('@_label');
export const getPropDomain = getPropAsString('@_domain');

export const getPropFileSize = getPropAsNumber('@_fileSize');
export const getPropLength = getPropAsNumber('@_length');
export const getPropBitrate = getPropAsNumber('@_bitrate');
export const getPropFramerate = getPropAsNumber('@_framerate');
export const getPropSamplingrate = getPropAsNumber('@_samplingrate');
export const getPropChannels = getPropAsNumber('@_channels');
export const getPropDuration = getPropAsNumber('@_duration');
export const getPropHeight = getPropAsNumber('@_height');
export const getPropWidth = getPropAsNumber('@_width');

export const getPropIsDefault = getPropAsBoolean('@_isDefault');
export const getPropIsPermaLink = getPropAsBoolean('@_isPermaLink');