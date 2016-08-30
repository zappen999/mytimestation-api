const request = require('request');
const req = request.defaults({
  jar: true
});

const self = module.exports = {
  // Timezone offset
  utcOffset: -120,

  /**
   * Logs in a user
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string} email    Email of the user to login
   * @param  {string} password Password of the user to login
   * @return {Promise}
   */
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      req.post({
        url: 'https://www.mytimestation.com/Login.asp',
        form: {
          eMail: email,
          Password: password,
          submit: 'Login'
        }
      }, (err, response, body) => {
        if (err) {
          return reject(err);
        }

        if (response.statusCode !== 302) {
          return reject(new Error('Login failed (HTTP code not 302)'));
        }

        if (body.indexOf('class="formError"') !== -1) {
          return reject(new Error('Login failed (body error)'));
        }

        return resolve();
      });
    });
  },

  /**
   * Punches in the logged in user
   * https://gyazo.com/29ce0fc2d2d62eebf8dd57bd8f12533a
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {Promise}
   */
  punchIn: () => {
    return new Promise((resolve, reject) => {
      req.post({
        url: 'https://www.mytimestation.com/User_Home.asp',
        form: {
          Department: '0',
          PunchType: '1',
          utcOffset: self.utcOffset,
          submit: true
        }
      }, (err, response, body) => {
        if (err) {
          return reject(err);
        }

        if (response.statusCode !== 302) {
          return reject(new Error('Punch in failed (HTTP code not 302)'));
        }

        return resolve();
      });
    });
  },

  /**
   * Punches out the logged in user
   * https://gyazo.com/fe36c239b5741f0425c4bf757d52df8f
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {Promise}
   */
  punchOut: () => {
    return new Promise((resolve, reject) => {
      req.post({
        url: 'https://www.mytimestation.com/User_Home.asp',
        form: {
          PunchType: '2',
          utcOffset: -120,
          submit: true
        }
      }, (err, response, body) => {
        if (err) {
          return reject(err);
        }

        if (response.statusCode !== 302) {
          return reject(new Error('Punch out failed (HTTP code not 302)'));
        }

        return resolve();
      });
    });
  },

  /**
   * Checks if the current logged in user is punched in
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {Boolean} True if punched in, false if not
   */
  isPunchedIn: () => {

  }
};
