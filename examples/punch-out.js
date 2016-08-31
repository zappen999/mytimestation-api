const Timestation = require('../lib')({
  email: 'YOUR_EMAIL',
  password: 'YOUR_PASSWORD'
});

Timestation.login().then(() => {
  console.log('Successfully logged in');

  return Timestation.punchOut().then(() => {
    console.log('Successfully punched out');
  });
}).catch(err => {
  console.log('Punch out failed', err);
});
