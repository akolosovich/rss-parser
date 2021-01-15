import { eError, Fun } from '../dtos';
import { isFunction } from './core';

export const createSelector = (...args: any[]): Fun<any> => {
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
  
    return (data: any) => Object.keys(obj).reduce((memo: any, key: string) => {
      const fn = obj[key];
  
      if (!isFunction(fn)) {
        throw new TypeError(eError.NotAFunction);
      }
  
      memo[key] = fn(data);
  
      return memo;
    }, {});
  };