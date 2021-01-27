import { readFileSync, writeFileSync } from 'fs';
import diff from 'variable-diff';

import { rssParser } from '../src';

const run = (directory: string) =>
  it(directory, async () => {
    const dirName = `${__dirname}/${directory}`;
    const content = readFileSync(`${dirName}/input.xml`, 'utf-8');
    const expected = JSON.parse(readFileSync(`${dirName}/expected.json`, 'utf-8'));

    const result = rssParser.parseString(content);

    const changes = diff(expected, result);

    if (changes.changed) {
      if (false) {
        const resultString = JSON.stringify(result, null, 2);

        writeFileSync(`${dirName}/expected.json`, resultString, 'utf-8');
      }
      console.log(directory, changes.text);
      expect(false).toBeTruthy();
    }
  });

describe('rssParser', () => {
  it('empty payload should return null', () => {
    const result = rssParser.parseString('');

    expect(result).toStrictEqual(null);
  });

  run('general');
  run('atom_full');
  run('media');
  run('rss_1_0');
  
  run('dtf_ru');
  run('nytimes_com');
  run('abcnews.go.com');
  run('omnycontent.com');
  run('dublin_core');
});
