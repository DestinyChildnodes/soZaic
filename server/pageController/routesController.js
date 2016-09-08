"use strict";

const apiRequest = require('../../server/requests.js');

module.exports = {
  twitterData: (req, res, screen_name, token) => {
    apiRequest.twitterGET(token, screen_name, (tweets) => {
      // console.log("inside twitterGEt")s
      let texts = []
      for (let el of tweets) {
        texts.push(el)
      }
      res.send(texts);
    });
  },

  youTubeData: (req, res, token) => {
    let playlistData = []


    apiRequest.youtubeGET(token, (resData, token) => {
      // apiRequest.youtTubeGetPlaylists(token, )
      console.log(token)
      let items = JSON.parse(resData).items;
      if (items) {
        let promiseArr = [];
          for (let item of items) {
            promiseArr.push(new Promise(function(resolve, reject) {
              let channelId = item.snippet.resourceId.channelId;
                apiRequest.youtTubeGetPlaylists(token, channelId, (data) => {

                  playlistData.push(data)
                  resolve(playlistData)
                })
              })
            )
          }

          return Promise.all(promiseArr).then((data) => {
            res.send(playlistData);
          });
      }
    });
  },

  fbData: (req, res, id, token) => {
    apiRequest.facebookGET(id,token, (data) => {
      res.send(data);
    })
  },

  fbSp: (req, res, id, token, type) => {
    apiRequest.facebookSpGET(id, token, type, (data) => {
      res.send(data);
    })
  },

  instagramData: (req, res, token) => {
    apiRequest.instagramGET(token, (body) => {
      res.send(body)
    });
  }
}
