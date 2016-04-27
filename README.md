# hapi-pres
[![Npm Version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Dependencies][david-badge]][david-url]
[![Dev dependencies][david-dev-badge]][david-url]

[![NPM](https://nodei.co/npm/hapi-pres.png)](https://nodei.co/npm/hapi-pres/)

[npm-badge]: https://badge.fury.io/js/hapi-pres.svg
[npm-url]: https://badge.fury.io/js/hapi-pres
[travis-badge]: https://travis-ci.org/ar4mirez/hapi-pres.svg?branch=master
[travis-url]: https://travis-ci.org/ar4mirez/hapi-pres
[david-badge]: https://david-dm.org/ar4mirez/hapi-pres.svg
[david-dev-badge]: https://david-dm.org/ar4mirez/hapi-pres/dev-status.svg
[david-url]: https://david-dm.org/ar4mirez/hapi-pres
[david-dev-url]: https://david-dm.org/ar4mirez/hapi-pres#info=devDependencies

Plugin to autoload pre-requirements.

### How to use:
- Install `hapi-pres` npm package in your project our plugin.
`npm i hapi-pres`
- Register plugin in your hapi server:

### Registering

```javascript
const server = new Hapi.Server();

server.connection();

server.register({
    register: require('hapi-pres'),
    options: {
        dirname: 'path/to/pres' // required
    }
}, (err) => {
  // continue application
});
```

manifest style:
```javascript
registrations: [
    ...
    {
        plugin: {
            register: 'hapi-pres',
            options: {
                dirname: 'path/to/pres'
            }
        }
    }
];
```

Your pre-requirements are available in your `server` object.
```javascript

server.pre.preFilename.preObjectKey
```

#### Pre-requirement Signature
```javascript
'use strict';

exports.preA = {
    assign: 'preA',
    method: (request, reply) => {

        return reply({
            message: 'Hello World.'
        });
    };
};
```
