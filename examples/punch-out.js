const Timestation = require('../lib');

const email = 'YOUR_EMAIL';
const pass = 'YOUR_PASS';

Timestation.login(email, pass).then(() => {
  console.log('Successfully logged in');

  return Timestation.punchOut().then(() => {
    console.log('Successfully punched out');
  });
}).catch(err => {
  console.log('Punch out failed', err);
});
