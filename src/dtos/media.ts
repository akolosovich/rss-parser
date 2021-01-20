import { Nullable } from './';

export type MediaTextData = null | {
  value: Nullable<string>;
  type: Nullable<string>;
};

export type MediaThumbnail = null | {
  url: Nullable<string>;
  width: number;
  height: number;
  time: Nullable<string>;
};

export type MediaCredit = null | {
  value: Nullable<string>;
  role: Nullable<string>;
  scheme: Nullable<string>;
};

export type MediaCopyright = null | {
  url: Nullable<string>;
};

export type MediaCategory = null | {
  value: Nullable<string>;
  scheme: Nullable<string>;
  label: Nullable<string>;
};

export type MediaBase = null | {
  title: MediaTextData;
  description: MediaTextData;
  thumbnails: MediaThumbnail;
  categories: MediaCategory[];
  credit: MediaCredit;
  copyright: MediaCopyright;
};

export type MediaContent =
  | null
  | (MediaBase & {
      url: Nullable<string>;
      fileSize: number;
      type: Nullable<string>;
      medium: Nullable<string>;
      isDefault: boolean;
      expression: Nullable<string>;
      bitrate: number;
      framerate: number;
      samplingrate: number;
      channels: number;
      duration: number;
      height: number;
      width: number;
      lang: Nullable<string>;
    });

export type Media =
  | null
  | (MediaBase & {
      content: MediaContent;
    });
