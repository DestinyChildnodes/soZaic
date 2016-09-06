"use strict";

module.exports = {

  // twitter: {
  //   TWITTER_CONSUMER_KEY: `e9oSfxXtRTWObrcyB8dbKe8B4`,
  //   TWITTER_CONSUMER_SECRET: `o6gIdU576vUmYcqq3Bzk1Fo0LHJ0utKP6RcpTGOSxPXD7ORDAp`
  //   // TWITTER_ACCESS_TOKEN: `2909473447-WwTgSwukO5PNsJAMVQx1UgGlLvtFWJtvKlhq8JZ`,
  //   // TWITTER_ACCESS_TOKEN_SECRET: `Ps8CAqDuT7QxRV5pgj5pni2XpDTCzj6zFjoCHl9xQgdnJ`
  // },

  twitter: {
    TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET
  },

  instagram: {
    ClientID: `d380635a2a114197aa18178023635d15`,
    ClientSecret: `7b178f8ac8124497a5b127c988e6b4d8`
  },

  facebook: {
    clientID : `665947800248819`,
    clientSecret: `6198dbb101dc82aa2f66154eb50dc84a`,
    callbackURL: `http://localhost:8080/auth/facebook/callback`
  },

  youtube: {
    clientID: `301039466455-f2d3c1059na8fklsqbtnonne76gpahvr.apps.googleusercontent.com`,
    clientSecret: `1OPtXki9LugZ89EA4Zi4naB3`
  }

  // youtube: {
  //   clientID: process.env.clientID,
  //   clientSecret: process.env.clientSecret
  // }
}
