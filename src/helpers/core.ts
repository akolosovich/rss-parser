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
export const trimOrNull = (str: string) => (str ? trim(str) : null);
export const flow = (...args: any[]) => (data: any) => {
  let result: any = null;

  for (let i = 0; i < args.length; i++) {
    const fn = args[i];

    if (i === 0) {
      result = fn(data);
    } else {
      result = fn(result);
    }
  }

  return result;
};
export const map = (fn: any) => (array: any[]): any[] => array.map(fn);
export const filter = (fn: any) => (array: any[]): any[] => array.filter(fn);
export const getOr = (defaultValue: any) => (field: string) => (obj: any) => (obj ? obj[field] : defaultValue);
export const get = getOr(undefined);
export const getOrNull = getOr(null);
export const toInteger = (value: any): number => {
  const result = Number(value);

  return Number.isInteger(result) ? result : 0;
};
export const toBoolean = (value: any) => !!value;