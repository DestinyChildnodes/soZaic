"use strict";

module.exports = {

 twitter: {
   TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
   TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET
 },

 instagram: {
   ClientID: process.env.instaClientId,
   ClientSecret: process.env.instaClientSecret
 },

 facebook: {
   clientID : process.env.fbClientId,
   clientSecret: process.env.fbClientSecret
 },

 youtube: {
   clientID: process.env.youtubeClientId,
   clientSecret: process.env.youtubeClientSecret
 }
}
