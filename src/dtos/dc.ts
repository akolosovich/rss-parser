import { Nullable } from './';

export type DublinCore = null | {
  id: Nullable<string>
  title: Nullable<string>
  creators: string[]
  subject: Nullable<string>
  description: Nullable<string>
  publishers: string[]
  contributors: string[]
  date: Nullable<Date>
  type: Nullable<string>
  format: Nullable<string>
  sources: string[]
  language: Nullable<string>
  relation: Nullable<string>
  coverage: Nullable<string>
  rights: Nullable<string>
};
