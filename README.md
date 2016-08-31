# mytimestation-api
API wrapper for mytimestation.com

## Installation
`npm install mytimestation-api --save`

## Usage

#### Settings
```js
const settings = {
  utcOffset: -120,         // Timeskew from UTC (default -120)
  department: '0'          // Which department to punch in to (0 default, 1 for IT?)
  email: 'your@email.com', // Email
  password: 'password'     // Password
}
```

#### Punch in example
```js
const Timestation = require('mytimestation-api')({
  email: 'your@email.com',
  password: 'password'
});

Timestation.login().then(() => {
  console.log('Successfully logged in');

  return Timestation.punchIn().then(() => {
    console.log('Successfully punched in');
  });
}).catch(err => {
  console.log('Punch in failed', err);
});
```
