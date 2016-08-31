const Timestation = require('../lib')({
  email: 'YOUR_EMAIL',
  password: 'YOUR_PASSWORD'
});

Timestation.login().then(() => {
  console.log('Successfully logged in');

  return Timestation.punchIn().then(() => {
    console.log('Successfully punched in');
  });
}).catch(err => {
  console.log('Punch in failed', err);
});
