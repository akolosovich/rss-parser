import { Nullable } from './base';
import { DublinCore } from './dc';
import { Media } from './media';

export enum eLinkRel {
  alternate = 'alternate',
  enclosure = 'enclosure',
  related = 'related',
  self = 'self',
  via = 'via',
}

export enum eTextType {
  text = 'text',
  html = 'html',
  xhtml = 'xhtml',
}

export type Generator = null | {
  value: Nullable<string>;
  version?: Nullable<string>;
  uri?: Nullable<string>;
};

export type Link = null | {
  href: Nullable<string>;
  rel?: Nullable<string>;
  type?: Nullable<eLinkRel>;
  hreflang?: Nullable<string>;
  title?: Nullable<string>;
  length?: number;
};

export type Image = null | {
  url: Nullable<string>;
  title: Nullable<string>;
  description: Nullable<string>;
  link: Nullable<string>;

  width?: number;
  height?: number;
};

export type Cloud = null | {
  domain: Nullable<string>;
  port: number;
  path: Nullable<string>;
  registerProcedure: Nullable<string>;
  protocol: Nullable<string>;
};

export type Text = null | {
  value: Nullable<string>;
  type: Nullable<string>;
};

export type Content =
  | null
  | (Text & {
      src: Nullable<string>;
    });

export type Person = null | {
  name: Nullable<string>;
  uri?: Nullable<string>;
  email?: Nullable<string>;
};

export type TextInput = null | {
  title: Nullable<string>;
  description: Nullable<string>;
  link: Nullable<string>;
  name: Nullable<string>;
};

export type Category = null | {
  value: Nullable<string>;
  scheme?: Nullable<string>;
  label?: Nullable<string>;
  domain?: Nullable<string>;
};

export type Guid = null | {
  value: Nullable<string>;
  isPermaLink: boolean;
};

export type Source = null | {
  id: Nullable<string>;
  title: Nullable<string>;
  updatedOn: Nullable<string>;
  url: Nullable<string>;
};

export type Enclosure = null | {
  url: Nullable<string>;
  type: Nullable<string>;
  length: number;
};

export type BaseFeed = null | {
  id: Guid;
  updatedOn: Nullable<Date>;
  publishedOn?: Nullable<Date>;
  copyright?: Text;
  links?: Link[];
  authors?: Person[];
  contributors?: Person[];
  categories?: Category[];
  dc?: DublinCore;
};

export type Entry =
  | null
  | (BaseFeed & {
      title: Text;
      description?: Text;
      source?: Source;
      enclosures?: Enclosure[];
      comments?: Nullable<string>;
      content?: Content;
      media?: Media;
    });

export type Channel =
  | null
  | (BaseFeed & {
      title: Nullable<string>;
      description?: Nullable<string>;
      version?: Nullable<string>;
      image?: Image;
      language?: Nullable<string>;
      managingEditor?: Person;
      webMaster?: Person;
      icon?: Nullable<string>;
      logo?: Nullable<string>;
      entries?: Entry[];

      textInput?: TextInput;
      docs?: Nullable<string>;
      generator?: Generator;
      cloud?: Cloud;
      ttl?: number;
      skipHours?: number[];
      skipDays?: string[];
    });
