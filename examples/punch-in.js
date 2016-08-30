const Timestation = require('../lib');

const email = 'YOUR_EMAIL';
const pass = 'YOUR_PASS';

Timestation.login(email, pass).then(() => {
  console.log('Successfully logged in');

  return Timestation.punchIn().then(() => {
    console.log('Successfully punched in');
  });
}).catch(err => {
  console.log('Punch in failed', err);
});
