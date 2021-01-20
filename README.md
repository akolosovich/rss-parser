# RSS Parser

## Usage

```javascript
const { rssParser } = require('@akolosovich/rss-parser');

// import { rssParser } from '@akolosovich/rss-parser';

const data = rssParser.parseString(...);

console.log(data);
```

- [Output Example](test/general/expected.json)
- [Types](src/dtos/rss.ts)

## But Why

Why to write my own parser instead of using existing one?

Firstly, I didn't find any parsers which return the same data format no matter which RSS feed I submit.

Secondly, since no one is following proper specification in their RSS feeds, I wanted to be able to parse any "incorrect" feeds (eg, Enclosure according to spec is only one per item, however many feeds add more than one).

Thirdly, I wanted to create private RSS server as a replacement for public one (eg feedly), and for this purpose I wanted to have better understanding of RSS data structure.

## TODO

- add DC support
- add RSS 1.0 support
- use proper tests

## Specs and Namespaces

- [RSS 1.0 spec](https://validator.w3.org/feed/docs/rss1.html)
- [RSS 2.0 spec](https://validator.w3.org/feed/docs/rss2.html)
- [Atom spec](https://validator.w3.org/feed/docs/atom.html)
- [Media Namespace spec](https://www.rssboard.org/media-rss)

## Links

- [Really Simple Syndication Best Practices Profile](https://www.rssboard.org/rss-profile)
