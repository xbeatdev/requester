# Requester

Simple AJAX library.

## Benefits

- Cross-browser support.
- [async/await](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/async_function) support.
- Typescript inside.

## Installation

```bash
$ npm i @xbeat/requester
```

## Usage

### Creating instance of requester

```js
import Requester from '@xbeat/requester';

const requestInstance = new Requester();

requestInstance.get('/posts').then(data => console.log(data));
```

### Static

```js
import Requester from '@xbeat/requester';

Requester.get('/posts').then(data => foo(data)).catch(err => handle(err));
```

## Possible request methods

- ``get()`` - **GET**
- ``post()`` - **POST**
- ``put()`` - **PUT**
- ``delete()`` - **DELETE**
- ``patch()`` - **PATCH**
- ``head()`` - **HEAD**
- ``option()`` - **OPTION**
- ``custom()`` - You can pass your own request method (*note*: default is **GET** method)

## options

RequesterConfig contains next fields
```ts
Requester.post('/users', {
  url?: string; // Default: ''
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTION' | any; // Default: 'GET'
  // Your request origin.
  // E.g. https://google.com/api/foo/bar. https://google.com - base url.
  baseUrl?: string; // Default: location.origin
  responseType?: 'json' | 'text'; // Default: 'json'
  // Query params with encoding.
  params?: any; // Default: {}
  // Request body.
  payload?: any; // Default: {}
  headers?: {}; // Default: {}
  // Providing header: Authorization: 'Basic foobar'
  auth?: {username: string; password: number} | null; // Default: null
  // Clear cache. Will add header 'Cache-Control': 'no-cache'
  cache?: boolean; // Default: true
  authRequired?: boolean; // Default: false
})
```

## Constructor

```js
/**
 * @param url - string | RequesterConfig
 * @param options - RequesterConfig
**/
Requester.get(url, options);
```

## Response schema

```ts
{
  // Status code which server returned
  status: number;
  // Benchmarks of request.
  timing: {
    // When request sent
    startTimestamp: number;
    // When response received
    endTimestamp: number;
    // Total waiting. Format: 1.3s, 15.5s.
    totalRequestTime: string;
  }

  // All your provided headers & cache header
  requestHeaders: {};

  // All response headers
  responseHeaders: {};

  // Received data from API
  responseData: any;

  // URL where request was sent
  url: string;
}
```

## FYI

Passing few options will be deep merged.

Basic merge.
```ts
const instance = new Requester({
  baseUrl: 'https://my-awesome-api.com/api'
});

await instance.put({
  url: '/route'
}, {
  params: {
    foo: 'bar'
  }
});
```

You will receive a config:
```js
{
  url: '/route',
  baseUrl: 'https://my-awesome-api.com/api',
  params: {
    foo: 'bar'
  }
}
```

Overriding config.

```ts
const instance = new Requester({
  baseUrl: 'https://my-awesome-api.com/api'
});

await instance.put({
  url: '/route'
}, {
  baseUrl: 'https://my-awesome-api.com/api/v/2',
});
```

You will receive a config:
```js
{
  url: '/route',
  baseUrl: 'https://my-awesome-api.com/api/v/2'
}
```
**Note: Your last options will override previous.**