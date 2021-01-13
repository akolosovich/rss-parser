import { eError, Fun } from '../dtos';

export const isFunction = (obj: any): boolean => typeof obj === 'function';
export const isArray = (obj: any): boolean => obj instanceof Array;
export const isString = (obj: any): boolean => typeof obj === 'string' || obj instanceof String;
export const trim = (str: string): string => {
  if (!str) {
    return '';
  }
  
  if (isString(str)) {
    return str.trim();
  }

  return '';
};
export const getOr = (defaultValue: any) => (field: string) => (obj: any) => (obj ? obj[field] : defaultValue);
export const get = getOr(undefined);
export const getOrNull = getOr(null);

export const createSelector = (...args: any[]) => {
  if (!args || !args.length) {
    throw new TypeError(eError.InvalidArguments);
  }

  return (data: any) => {
    if (!data) {
      throw new TypeError(eError.InvalidArguments);
    }

    const props = args.slice();
    const output: any[] = [];

    let result = null;

    if (props.length === 1) {
      const fn = props.shift();

      if (!isFunction(fn)) {
        throw new TypeError(eError.NotAFunction);
      }

      return fn(data);
    }

    while (props.length) {
      const fn = props.shift();

      if (!isFunction(fn)) {
        throw new TypeError(eError.NotAFunction);
      }

      if (!props.length) {
        result = fn(...output);
      } else {
        output.push(fn(data));
      }
    }

    return result;
  };
};

export const createStructuredSelector = (obj: any): Fun<any> => {
  if (!obj) {
    throw new TypeError(eError.InvalidArguments);
  }

  return (data: any) => {
    if (!data) {
      throw new TypeError(eError.InvalidArguments);
    }
    
    return Object.keys(obj).reduce((memo: any, key: string) => {
      const fn = obj[key];

      if (!isFunction(fn)) {
        throw new Error('Not a function');
      }
  
      memo[key] = fn(data);
  
      return memo;
    }, {});
  }
};
