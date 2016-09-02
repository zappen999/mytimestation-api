const request = require('request');
const merge = require('deepmerge');

class Timestation {
  constructor(utcOffset, department, email, password) {
    this.utcOffset = utcOffset;
    this.department = department;
    this.email = email;
    this.password = password;
    this.req = request.defaults({
      jar: true
    });
  }

  /**
   * Logs in a user
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {Promise}
   */
  login() {
    return new Promise((resolve, reject) => {
      this.req.post({
        url: 'https://www.mytimestation.com/Login.asp',
        form: {
          eMail: this.email,
          Password: this.password,
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
  }

  /**
   * Punches in the logged in user
   * https://gyazo.com/29ce0fc2d2d62eebf8dd57bd8f12533a
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {Promise}
   */
  punchIn() {
    return new Promise((resolve, reject) => {
      this.req.post({
        url: 'https://www.mytimestation.com/User_Home.asp',
        form: {
          Department: this.department,
          PunchType: '1',
          utcOffset: this.utcOffset,
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
  }

  /**
   * Punches out the logged in user
   * https://gyazo.com/fe36c239b5741f0425c4bf757d52df8f
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {Promise}
   */
  punchOut() {
    return new Promise((resolve, reject) => {
      this.req.post({
        url: 'https://www.mytimestation.com/User_Home.asp',
        form: {
          PunchType: '2',
          utcOffset: this.utcOffset,
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
  }

  /**
   * Checks if the current logged in user is punched in
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {Promise} True if punched in, false if not
   */
  isPunchedIn() {
    return new Promise((resolve, reject) => {
      this.req.get({
        url: 'https://www.mytimestation.com/User_Home.asp',
      }, (err, response, body) => {
        if (err) {
          return reject(err);
        }

        if (body.indexOf('name="PunchType" id="PunchType" type="hidden" value="2"') !== -1) {
          return resolve(true);
        }

        return resolve(false);
      });
    });
  }
}

module.exports = (settings) => {
  const defaults = {
    utcOffset: -120,
    department: '0',
    email: '',
    password: ''
  };

  settings = merge(defaults, settings);
  return new Timestation(
    settings.utcOffset,
    settings.department,
    settings.email,
    settings.password
  );
};
