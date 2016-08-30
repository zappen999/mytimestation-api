# mytimestation-api
API wrapper for mytimestation.com

## Installation
todo...

## Usage
Punch in example
```js
const Timestation = require('mytimestation-api'); // TODO: publish npm package

Timestation.login('YOUR_EMAIL', 'YOUR_PASS').then(() => {
  console.log('Successfully logged in');

  return Timestation.punchIn().then(() => {
    console.log('Successfully punched in');
  });
}).catch(err => {
  console.log('Punch in failed', err);
});
```
