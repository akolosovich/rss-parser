
export type Nullable<T> = null | T;
export type Fun<T> = (...args: any[]) => T;

export enum eError {
    InvalidArguments = 'invalid arguments',
    NotAFunction = 'not a function',
}

export type Link = null | {
    rel: Nullable<string>,
    url: Nullable<string>
}

export type Enclosure = null | {
    url: Nullable<string>
    type: Nullable<string>
    length: number
}

export type Guid = null | {
    value: Nullable<string>
    isPermaLink: Boolean
}

export type Image = null | {
    url: Nullable<string>
    title: Nullable<string>
    link: Nullable<string>
}

export type Source = null | {
    url: Nullable<string>
    title: Nullable<string>
}

export type ChannelItem = null | {
    title: Nullable<string>
    description: Nullable<string>
    content: Nullable<string>
    links: Link[]
    guid: Guid
    categories: Nullable<string>[]
    enclosure: Enclosure
    publishedOn: Nullable<string>
    source: Source
    media: Media
}

export type Channel = null | {
    version: Nullable<string>
    title: Nullable<string>
    description: Nullable<string>
    language: Nullable<string>
    links: Link[]
    image: Image
    managingEditor: Nullable<string>
    webMaster: Nullable<string>
    publishedOn: Nullable<string>
    lastBuildOn: Nullable<string>
    categories: Nullable<string>[]
    items: ChannelItem[]
}

export type MediaTextData = null | {
    value: Nullable<string>
    type: Nullable<string>
}

export type MediaThumbnail = null | {
    url: Nullable<string>
    width: number
    height: number
    time: Nullable<string>
}

export type MediaCredit = null | {
    value: Nullable<string>
    role: Nullable<string>
    scheme: Nullable<string>
}

export type MediaCopyright = null | {
    url: Nullable<string>
}

export type MediaCategory = null | {
    value: Nullable<string>
    scheme: Nullable<string>
    label: Nullable<string>
}

export type MediaContent = null | {
    title: MediaTextData
    description: MediaTextData
    thumbnail: MediaThumbnail
    categories: MediaCategory[]
    credit: MediaCredit
    copyright: MediaCopyright
    url: Nullable<string>,
    fileSize: number
    type: Nullable<string>
    medium: Nullable<string>
    isDefault: boolean
    expression: Nullable<string>
    bitrate: number
    framerate: number
    samplingrate: number
    channels: number
    duration: number
    height: number
    width: number
    lang: Nullable<string>
}

export type Media = null | {
    content: MediaContent
    categories: MediaCategory[]
}