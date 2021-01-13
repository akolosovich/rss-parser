export type Str = null | String | string;
export type Num = null | Number | number;
export type Fun<T> = (...args: any[]) => T;

export enum eError {
    InvalidArguments = 'invalid arguments',
    NotAFunction = 'not a function',
}

export type Link = null | {
    rel: Str,
    url: Str
}

export type Enclosure = null | {
    url: Str
    type: Str
    length: Num
}

export type Guid = null | {
    value: Str
    isPermaLink: Boolean
}

export type Image = null | {
    url: Str
    title: Str
    link: Str
}

export type Source = null | {
    url: Str
    title: Str
}

export type Channel = null | {
    title: Str
    description: Str
    language: Str
    links: null | Link[]
    image: Image
    managingEditor: Str
    webMaster: Str
    publishedOn: Str
    lastBuildOn: Str
    categories: null | Str[]
}

export type ChannelItem = null | {
    title: Str
    description: Str
    content: Str
    links: null | Link[]
    guid: Guid
    categories: null | Str[]
    enclosure: Enclosure
    publishedOn: Str
    source: Source
}
