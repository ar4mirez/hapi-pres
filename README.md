# hapi-pres

[![npm version](https://img.shields.io/npm/v/@ar4mirez/hapi-pres.svg)](https://www.npmjs.com/package/@ar4mirez/hapi-pres)
[![CI](https://github.com/ar4mirez/hapi-pres/actions/workflows/ci.yml/badge.svg)](https://github.com/ar4mirez/hapi-pres/actions)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Autoload pre-requirements for HapiJS routes from a directory.

## Requirements

- Node.js >= 18
- `@hapi/hapi` ^21

## Installation

```bash
npm install @ar4mirez/hapi-pres
```

## Usage

```js
const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = new Hapi.Server({ host: 'localhost', port: 3000 });

  await server.register({
    plugin: require('@ar4mirez/hapi-pres'),
    options: {
      dirname: '/pre'
    }
  });

  // Pre-requirements are now available via server.pre.*
  // Example: server.pre.myPreCheck(request, h)

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
```

The plugin scans the configured directory for pre-requirement files and decorates the server with them under a configurable prefix. Each exported function in the scanned files becomes accessible via `server.<prefix>.<filename>`.

**Example pre-requirement file** (`lib/pre/auth.js`):

```js
module.exports = async (request, h) => {
  // perform pre-check, e.g. token validation
  return { userId: 42 };
};
```

**Using it in a route:**

```js
server.route({
  method: 'GET',
  path: '/protected',
  options: {
    pre: [{ method: server.pre.auth, assign: 'auth' }],
    handler: async (request, h) => {
      return { user: request.pre.auth.userId };
    }
  }
});
```

## API / Options

| Option       | Type    | Default                | Description                          |
|-------------|---------|------------------------|--------------------------------------|
| `cwd`        | string  | `process.cwd()`        | Base directory for scanning          |
| `dirname`    | string  | `'/pre'`               | Subdirectory to scan for pre files   |
| `filter`     | RegExp  | `/^(.+)\.js$/`         | File filter regex                    |
| `excludeDirs`| RegExp  | `/^\.(git\|svn)$/`     | Directories to exclude from scanning |
| `recursive`  | boolean | `true`                 | Scan subdirectories recursively      |
| `prefix`     | string  | `'pre'`                | Server decoration key                |

## License

ISC © [Angel Ramirez](https://github.com/ar4mirez)
