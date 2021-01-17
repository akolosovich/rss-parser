export type Nullable<T> = null | T;
export type Fun<T> = (...args: any[]) => T;
export type Dictionary<T> = {
    [key: string]: T
}
export enum eError {
    InvalidArguments = 'invalid arguments',
    NotAFunction = 'not a function',
}