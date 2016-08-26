//TODO: Need to add twitter api
var request = require('../../requests.js');

module.exports = {
  getData: () => {
    request.instagramGET();
  }
}
