import { readFileSync, writeFileSync } from 'fs';
import diff from 'variable-diff';

import { rssParser } from '../src';

const run = (directory: string, override = false) =>
  it(directory, async () => {
    const dirName = `${__dirname}/${directory}`;
    const content = readFileSync(`${dirName}/input.xml`, 'utf-8');
    const expected = JSON.parse(readFileSync(`${dirName}/expected.json`, 'utf-8'));

    const result = rssParser.parseString(content);

    const changes = diff(expected, result);

    if (changes.changed) {
      if (override) {
        const resultString = JSON.stringify(result, null, 2);
        
        writeFileSync(`${dirName}/expected.json`, resultString, 'utf-8');
      }
      console.log(directory, changes.text);
      expect(false).toBeTruthy();
    }
  });

describe('rssParser', () => {
  run('general');
  run('atom_full');
  run('media');
  run('dtf_ru');
  run('nytimes_com');
  run('abcnews.go.com');
});
