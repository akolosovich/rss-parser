import { createStructuredSelector, createSelector, isFunction, isArray, isString } from '../../src/helpers';
import { eError } from '../../src/dtos';

describe('createStructuredSelector', () => {
  const plusOne = (x: number): number => x + 1;

  it('with 0 arguments', () => {
    expect(createStructuredSelector).toThrowError(eError.InvalidArguments);
  });
  it('with 1 argument', () => {
    const test: any = createStructuredSelector({
      result: plusOne,
    });

    expect(test(1).result).toBe(2);
  });
  it('with 1+ argument', () => {
    const test: any = createStructuredSelector({
      resultA: plusOne,
      resultB: plusOne,
    });

    const { resultA, resultB } = test(1);

    expect(resultA).toBe(2);
    expect(resultB).toBe(2);
  });
});

describe('createSelector', () => {
  const plusOne = (x: number): number => x + 1;
  const toString = (...args: any[]) => args.toString();

  it('with 0 arguments', () => {
    expect(createSelector).toThrowError(eError.InvalidArguments);
  });
  it('with 0 arguments again', () => {
    const test: any = createSelector(plusOne);

    expect(() => test()).toThrowError(eError.InvalidArguments);
  });
  it('with 1 argument', () => {
    const test: any = createSelector(plusOne);

    expect(test(1)).toBe(2);
  });
  it('with 2 arguments', () => {
    const test: any = createSelector(plusOne, toString);

    expect(test(1)).toBe('2');
  });
  it('with 2+ arguments', () => {
    const test = createSelector(plusOne, plusOne, toString);

    expect(test(1)).toBe('2,2');
  });
  it('not a function: 1 arguments', () => {
    const test = createSelector(1 as any);

    expect(() => test(1)).toThrowError(eError.NotAFunction);
  });
  it('not a function: 1+ arguments', () => {
    const test = createSelector(1 as any, 2 as any);

    expect(() => test(1)).toThrowError(eError.NotAFunction);
  });
});

describe('isFunction', () => {
  it('true', () => {
    [() => {}, function() {}, new Function()].forEach(fn => expect(isFunction(fn)).toBeTruthy());
  });
  it('false', () => {
    [{}, 'string', 0, [], [], null, NaN].forEach(fn => expect(isFunction(fn)).toBeFalsy());
  });
});

describe('isArray', () => {
  it('true', () => {
    [[], []].forEach(fn => expect(isArray(fn)).toBeTruthy());
  });
  it('false', () => {
    [{}, 'string', 0, null, NaN, Array, () => {}, function() {}, new Function()].forEach(fn =>
      expect(isArray(fn)).toBeFalsy()
    );
  });
});

describe('isString', () => {
  it('true', () => {
    ['', new String()].forEach(fn => expect(isString(fn)).toBeTruthy());
  });
  it('false', () => {
    [{}, 0, null, NaN, Array, () => {}, function() {}, new Function(), String].forEach(fn =>
      expect(isString(fn)).toBeFalsy()
    );
  });
});
