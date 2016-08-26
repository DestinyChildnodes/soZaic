var request = require('../../requests.js');

module.exports = {
  getData: () => {
    request.facebookGET();
  }
}
